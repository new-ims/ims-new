import { Model } from "@common/models";
import { ProcessStepsVm, StepVm } from "./steps.vm";
import { ConfigStepTabVm } from "../../../config/config.vm";
import { isUnion } from "@common/utils";


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

export function shouldBeVisible(taskName: Model.TaskName, tabName: string): boolean {
    const isApprovalAuthorityTab = isUnion<Model.KnownTabName>(tabName, "APPROVAL_AUTHORITY");     
    if (!isApprovalAuthorityTab) return true; // every non "special" tab names is visible

    // if we got here, the tab name is definitely "APPROVAL_AUTHORITY"
    // so we only return true if the task name is one of the allowed ones
    return taskName === 'APPROVAL' || taskName === 'CANCELED' || taskName === 'COMPLETED';
}



/*
    build the logic the calculates the view model
*/