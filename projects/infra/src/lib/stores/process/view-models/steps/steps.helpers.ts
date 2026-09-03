import { Model } from "@common/models";
import { PROCESS_KNOWN } from "../../../../services/configuration/config.model";
import { ProcessStepsVm, StepVm } from "./steps.vm";
import { TaskName } from "../../../../../../../common/models/_types";
import { ConfigStepTabVm } from "../../..";

export function buildProcessStepsVm(
    dataFromProcess: Model.BaseProcess<string>, 
    configSteps: ConfigStepTabVm[] 
    // dataFromProcess: {
    //     stepName: string,
    //     taskName: string,
    // }, 
    // dataFromConfig: {
    //     configSteps: StepVm[],
    // }
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
    
    const states: (StepVm | null)[] = configSteps.map((step, index) => {
        if (index === selectedIndex) return { ...step, state: 'active' };
        if (step.alwaysEnabled) return { ...step, state: 'enabled' };
        if (!shouldBeVisible(dataFromProcess.taskName, step.name)) return null;
        // it's visible and not selected, so now lets decide about enabled
        if (index <= enabledIndex) return { ...step, state: 'enabled' };
        return { ...step, state: 'disabled' };
    });

    const steps = states.filter((s) => s !== null);
    const activeStep = steps.find(s => s.state === 'active');
    const selectedStep = activeStep ? activeStep : steps[0];
    const selectedStepIndex = steps.indexOf(selectedStep);

    return {
        steps,
        selectedStep,
        selectedStepName: selectedStep.name,
        selectedStepIndex
    };
}

export function shouldBeVisible(taskName: TaskName, tabName: string): boolean {
  // if the tab is approval, but we are not in approval task, then do not show it
  // otherwise, show it

  if (!(tabName === PROCESS_KNOWN.APPROVAL_STEP && !(taskName === PROCESS_KNOWN.APPROVAL_TASK || taskName === PROCESS_KNOWN.CANCELED_TASK || taskName === PROCESS_KNOWN.COMPLETED_TASK))) return true;
    return false;

  return true;
}



/*
    build the logic the calculates the view model
*/