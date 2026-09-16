import { DeepSignal, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { initialProcessSlice, isProcessClosedForEditing } from './process.slice';
import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { Model } from '@common/models';
import { Override } from '@common/utils';
import { computed, inject } from '@angular/core';
import { ConfigStore } from '../config/config.store';
import { buildProcessStepsVm } from './view-models/steps/steps.helpers';
import { LoginStore } from '../login/login.store';
import { buildProcessInfosVm } from './view-models/infos/infos.helpers';

export const ProcessStore = signalStore(
  { providedIn: 'root' },
  withState(initialProcessSlice()),
  withProps(_ => ({
    _configVm: inject(ConfigStore).configVm,
    _loginInfo: inject(LoginStore),
  })),
  withComputed((store) => {
    const isProcessDisabled = computed(() => isProcessClosedForEditing(store._loginInfo.processDisabled(), store.process()!.taskName));
    const stepsVm = computed(() => buildProcessStepsVm(
      store.process()!, 
      store._configVm(),
      store.overrides(),
      {
        userInfo: store._loginInfo.userInfo()!,
        processDisabled: isProcessDisabled(),
        isHistorical: store._loginInfo.isHistorical()
      }
    ));

    const infosVm = computed(() => buildProcessInfosVm(
      store.process()!,
      store._configVm(),
      store._loginInfo.userInfo()!
    ));

    return {
      isProcessDisabled,
      stepsVm,
      infosVm
    };
  }),
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
