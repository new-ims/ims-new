import { Model } from "@common/models";
import { ProcessStepsVm, StepVm } from "./steps.vm";
import { ConfigStepTabVm } from "../../../config/config.vm";
import { isUnion } from "@common/utils";
import { StepOverides } from "../../..";
import { Adapter } from "@common/adapter";

type StepContext = {
  index: number;
  selectedIndex: number;
  enabledIndex: number;
  taskName: Model.TaskName;
  insuredVerified: boolean;
  verifyInsured: boolean;
  overrides: StepOverides;
  userInfo: Adapter.UserInfo;
  processDisabled: boolean;
};

export function buildProcessStepsVm(
    dataFromProcess: {
        stepName: string,
        taskName: Model.TaskName,
        insuredVerified: boolean
    }, 
    configSteps: ConfigStepTabVm[], 
    overrides: StepOverides,
    userInfo: Adapter.UserInfo,
    verifyInsured: boolean,
    processDisabled: boolean
): ProcessStepsVm {
    // we read two important details from the process
    // stepName - the name of the latest enabled step
    // taskName - the name of the current task that the process is in

    // we decide what is enabled and active by the stepName
    // BUT - if there is no selected, then we decide that the selected tab is the
    // first step

    // if (process === null) return [];

    const enabledIndex = configSteps.findIndex((s) => s.name === dataFromProcess.stepName);
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

    const states: (StepVm | null)[] = configSteps.map((step, index) => {
        const context: StepContext = {
            index,
            selectedIndex,
            enabledIndex,
            taskName: dataFromProcess.taskName,
            insuredVerified: dataFromProcess.insuredVerified,
            verifyInsured,
            overrides,
            userInfo,
            processDisabled,
        }
         return buildStepVm(step,context);
    });

    const steps = states.filter((s) => s !== null);
    const activeStep = steps.find(s => s.active);
    const selectedStep = activeStep ? activeStep : steps[0];
    const selectedStepIndex = steps.indexOf(selectedStep);

    return {
        steps,
        selectedStep,
        selectedStepName: selectedStep.name,
        selectedStepIndex
    };
}

export function buildStepVm(step: ConfigStepTabVm, context: StepContext): StepVm | null {
  if (!isStepVisible(context.taskName, step.name)) {
    return null;
  }

  return {
    ...step,
    state: getStepState(step, context),
    active: isStepActive(context),
    readonly: isStepReadonly(step, context),
  };
}

export function isStepVisible(taskName: Model.TaskName, stepName: string): boolean {
    const isApprovalAuthorityTab = isUnion<Model.KnownTabName>(stepName, "APPROVAL_AUTHORITY");     
    if (!isApprovalAuthorityTab) return true; // every non "special" tab names is visible

    // if we got here, the tab name is definitely "APPROVAL_AUTHORITY"
    // so we only return true if the task name is one of the allowed ones
    return taskName === 'APPROVAL' || taskName === 'CANCELED' || taskName === 'COMPLETED';
}


export function getStepState(step: ConfigStepTabVm, context: StepContext): StepVm["state"] {
  if (step.alwaysEnabled) return "enabled";
  if (!context.insuredVerified && context.verifyInsured) return "disabled";
  if (context.overrides === "enable") return "enabled";
  if (context.overrides === "disable") return "disabled";
  return context.index <= context.enabledIndex ? "enabled" : "disabled";
}

export function isStepActive(context: StepContext): boolean {
  return context.index === context.selectedIndex;
}

export function isStepReadonly(step: ConfigStepTabVm, context: StepContext): boolean {
  if (context.processDisabled) return true;

  const isDoctorTab = isUnion<Model.KnownTabName>(step.name,"DOCTOR_DECISION");
  return context.userInfo.isDoctor && !isDoctorTab;
}



/*
    build the logic the calculates the view model
*/