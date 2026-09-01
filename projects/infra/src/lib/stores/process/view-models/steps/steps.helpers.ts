import { ProcessStepsVm } from "./steps.vm";

export function buildProcessStepsVm(): ProcessStepsVm {
    return {
        steps: [],
        selectedStep: null,
        selectedStepName: '',
        selectedStepIndex: -1,
    };
}