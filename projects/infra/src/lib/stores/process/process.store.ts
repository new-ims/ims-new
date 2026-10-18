import {
  DeepSignal,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { initialProcessSlice, isProcessClosedForEditing } from './process.slice';
import {
  rxMutation,
  updateState,
  withDevtools,
  withMutations,
} from '@angular-architects/ngrx-toolkit';
import { Model } from '@common/models';
import { Override } from '@common/utils';
import { computed, inject } from '@angular/core';
import { ConfigStore } from '../config/config.store';
import { buildProcessStepsVm } from './view-models/steps/steps.helpers';
import { LoginStore } from '../login/login.store';
import { buildProcessInfosVm } from './view-models/infos/infos.helpers';
import { selectInfo, selectStep, setCurrentStep } from './process.updaters';
import { getContextRunner, mutation } from '../../utils';
import { awaitLookups } from '../../services/lookups/get-lookup';

export const ProcessStore = signalStore(
  { providedIn: 'root' },
  withState(initialProcessSlice()),
  withProps((_) => {
    const _configStore = inject(ConfigStore);
    return {
      _configVm: _configStore.configVm,
      _configStore: _configStore,
      _loginInfo: inject(LoginStore),
      _runner: getContextRunner(),
    };
  }),
  withComputed((store) => {
    const isProcessDisabled = computed(() =>
      isProcessClosedForEditing(store._loginInfo.processDisabled(), store.process()!.taskName),
    );
    const stepsVm = computed(() =>
      buildProcessStepsVm(store.process()!, store._configVm(), store.overrides(), {
        userInfo: store._loginInfo.userInfo()!,
        processDisabled: isProcessDisabled(),
        isHistorical: store._loginInfo.isHistorical(),
      }),
    );

    const infosVm = computed(() =>
      buildProcessInfosVm(
        store.process()!,
        store._configVm(),
        store._loginInfo.userInfo()!,
        store.selectedInfoId(),
      ),
    );

    return {
      _config: computed(() => store._configStore.config()!),
      isProcessDisabled,
      stepsVm,
      infosVm,
    };
  }),
  withMutations((store) => ({
    _onEnterStep: mutation({
      operation: async (prm: { originalStep: string, nextStep: string }) => {
        // Implement the logic for handling entering a step here
        console.log('Entering step with params:', prm);
        const { originalStep, nextStep } = prm;
        const currentProcess = store.process();
        if ((!currentProcess) || (!nextStep) || (originalStep === nextStep)) return currentProcess;

        const currentStep = store.stepsVm().steps.find(step => step.name === nextStep);
        if (!currentStep) return currentProcess;

        const lookupKeys = currentStep.model.requiredLookups ?? [];
        if (lookupKeys.length > 0) {
          await store._runner(() => awaitLookups(store._config(), lookupKeys));
        }

        const onEnter = currentStep.onEnter;
        if (!onEnter) return currentProcess;

        const afterEnterProcess = await store._runner(() => onEnter(currentProcess));
        return afterEnterProcess;
      },
      onSuccess(result, param) {
        console.log('Step entered successfully:', result, 'with params:', param);
        updateState(store, '[Process] Step Entered Successfully', { process: result });
      },
    }), 
    _onEnterProcess: mutation({
      operation: async () => {
        const onEnter = store._configVm().onEnter ?? ((p) => p);
        const currentProcess = store.process();
        if (!currentProcess) return;
        const afterEnterProcess = await store._runner(() => onEnter(currentProcess));
        return afterEnterProcess;
      }, 
      onSuccess(result) {
        console.log('Process entered successfully:', result);
        updateState(store, '[Process] Enter Process - Success', { process: result });
      }
    }),
  })),
  withComputed((store) => ({
    isBusy: computed(() => store._onEnterProcessIsPending() || store._onEnterStepIsPending()),
  })),
  withMethods((store) => ({
    resetProcess: (process: Model.BaseProcess) => {
      updateState(store, '[Process] Reset Process', { process });
    },
    enableAllSteps: () => {
      updateState(store, '[Process] Enable All Steps', { overrides: 'enable' });
    },
    disableAllSteps: () => {
      updateState(store, '[Process] Disable All Steps', { overrides: 'disable' });
    },
    selectInfo: (infoId: string) => {
      updateState(store, '[Process] Select Info', selectInfo(infoId));
    },
    selectStep: async (nextStep: string) => {
      const originalStep = store.stepsVm().selectedStep?.name ?? '';
      updateState(store, '[Process] Select Step', selectStep(nextStep, store.stepsVm().steps));
      await store._onEnterStep({ originalStep, nextStep });
    },
    setCurrentStep: (stepName: string) => {
      updateState(
        store,
        '[Process] Set Current Step',
        setCurrentStep(stepName, store.stepsVm().steps),
      );
    },
    enterProcess: async () => {
      await store._onEnterProcess();
      const nextStep = store.stepsVm().selectedStepName;
      await store._onEnterStep({ originalStep: '', nextStep });
    },
  })),
  withDevtools('ProcessStore'),
);

export type KnownProcessStore<
  MAPPER extends Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER>,
> = Override<
  InstanceType<typeof ProcessStore>,
  {
    process: DeepSignal<Model.ProcessOf<MAPPER, Key>>;
    resetProcess: (process: Model.ProcessOf<MAPPER, Key>) => void;
  }
>;
