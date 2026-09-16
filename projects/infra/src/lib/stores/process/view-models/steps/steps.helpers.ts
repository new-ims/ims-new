import { Model } from '@common/models';
import { ProcessStepsVm, StepVm } from './steps.vm';
import { ConfigStepTabVm, ConfigVm } from '../../../config/config.vm';
import { isUnion } from '@common/utils';
import { StepOverides } from '../../..';
import { Adapter } from '@common/adapter';

type CommentedPredicate = [boolean, string];

export function buildProcessStepsVm(
  process: Model.BaseProcess,
  config: ConfigVm,
  overrides: StepOverides,
  login: {
    userInfo: Adapter.UserInfo;
    processDisabled: boolean;
    isHistorical: boolean;
  },
): ProcessStepsVm {
  // we read two important details from the process
  // stepName - the name of the latest enabled step
  // taskName - the name of the current task that the process is in

  // we decide what is enabled and active by the stepName
  // BUT - if there is no selected, then we decide that the selected tab is the
  // first step

  // if (process === null) return [];

  const enabledIndex = config.stepTabs.findIndex((s) => s.name === process.stepName);
  const selectedIndex = enabledIndex === -1 ? 0 : enabledIndex;

  // TODO
  // 1. Seperate the calculation of each aspect to a different function
  //       - Is tab visible at all
  //       - Is it enabled / disabled
  //       - Is it active
  //       - Is it read-only
  // 2. Make all these functions pure and testable
  // 3. We already have "enableAllSteps" and "disableAllSteps" in the store, but also need "unsetAllSteps" so that the overrides are reset

  // The absolute truth of when a step is disabled
  // 1. Overrides are the most powerful rule - and override, overside all other rules
  // 2. Configuration specific for step
  // 3. If the process must have insured verification, and it doesn't - It is disabled for sure
  // 4. Completion based enable/disable (accordding to current step, and task)
  //

  const states: (StepVm | null)[] = config.stepTabs.map((step, index) => {
    return buildStepVm(step, index);
  });

  const steps = states.filter((s) => s !== null);
  const activeStep = steps.find((s) => s.isActive);
  const selectedStep = activeStep ? activeStep : steps[0];
  const selectedStepIndex = steps.indexOf(selectedStep);

  return {
    steps,
    selectedStep,
    selectedStepName: selectedStep.name,
    selectedStepIndex,
  };

  function buildStepVm(step: ConfigStepTabVm, index: number): StepVm | null {
    const [isVisibleResult, isVisibleComment] = isVisible();

    if (!isVisibleResult) {
      return null;
    }

    const [isEnabledResult, isEnabledComment] = getIsEnabled();
    const [isReadonlyResult, isReadonlyComment] = isReadonly();

    return {
      ...step,
      isEnabled: isEnabledResult,
      isActive: isActive(),
      isReadonly: isReadonlyResult,
      debugComments: {
        isEnabled: isEnabledComment,
        isReadonly: isReadonlyComment
      }
    };

    function isVisible(): CommentedPredicate {
      // A step is invisible if the step name is 'approval...' and also the process task name is one of 'APPROVAL', 'CANCELED', 'COMPLETED'
      if (!isUnion<Model.KnownTabName>(step.name, 'APPROVAL_AUTHORITY')) return [true, ''];
      if (!['APPROVAL', 'CANCELED', 'COMPLETED'].includes(process.taskName)) return [false, 'Step is "APPROVAL_AUTHORITY" but the process task is not in approval/canceled/completed'];
      return [true, ''];
    }

    function getIsEnabled(): CommentedPredicate {
      // general logic
      if (step.alwaysEnabled) return [true, 'Step is always enabled'];
      if (!process.insuredVerified && config.verifyInsured) return [false, 'Process requires insured verification but it is not verified'];

      // force overrides
      if (overrides === 'enable') return [true, 'Force enabled by override'];
      if (overrides === 'disable') return [false, 'Force disabled by override'];

      // step overrides
      if (step.overrideIsEnabled !== null) {
        const [isEnabledOverride, isEnabledComment] = step.overrideIsEnabled(process);
        return [isEnabledOverride, "step config override: " + isEnabledComment];
      }

      // process overrides
      if (config.overrideIsEnabled !== null) {
        const [isEnabledOverride, isEnabledComment] = config.overrideIsEnabled(process);
        return [isEnabledOverride, "process config override: " + isEnabledComment];
      }

      // by index
      return [index <= enabledIndex, 'Step is enabled by index'];
    }

    function isReadonly(): CommentedPredicate {
      if (login.processDisabled) return [true, 'Process is disabled for the current login'];
      if (login.isHistorical) return [true, 'Process is historical for the current login'];

      // general logic
      const isDoctorTab = isUnion<Model.KnownTabName>(step.name, 'DOCTOR_DECISION');
      if  (login.userInfo.isDoctor && !isDoctorTab) return [true, 'User is a doctor but the tab is not the doctor tab'];
      const isApprovalAuthorityTab = isUnion<Model.KnownTabName>(step.name, 'APPROVAL_AUTHORITY');
      if (process.taskName === 'APPROVAL' && !isApprovalAuthorityTab) return [true, 'Process task is APPROVAL but the tab is not the approval authority tab'];


      // step overrides
      if (step.overrideReadonly !== null) {
        const [isReadonlyOverride, isReadonlyComment] = step.overrideReadonly(process);
        return [isReadonlyOverride, "step config override: " + isReadonlyComment];
      }

      // process overrides
      if (config.overrideReadonly !== null) {
        const [isReadonlyOverride, isReadonlyComment] = config.overrideReadonly(process);
        return [isReadonlyOverride, "process config override: " + isReadonlyComment];
      }

      return [false, 'Step is not readonly by any condition'];
    }

    function isActive(): boolean {
      return index === selectedIndex;
    }
  }
}

/*
    build the logic the calculates the view model
*/
