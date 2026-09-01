import { ProcessStepsVm } from "./steps.vm";

export function buildProcessStepsVm(
    dataFromProcess: {
    }, 
    dataFromConfig: {}): ProcessStepsVm {


    return {
        steps: [],
        selectedStep: null,
        selectedStepName: '',
        selectedStepIndex: -1,
    };
}


/*
    build the logic the calculates the view model
*/