import { PartialStateUpdater } from "@ngrx/signals";
import { ProcessSlice } from "./process.slice";
import { StepVm } from "./view-models/steps/steps.vm";

export function selectInfo(infoId: string): PartialStateUpdater<ProcessSlice> {
    return _ => ({
        selectedInfoId: infoId
    });
}

export function selectStep(stepName: string, steps: StepVm[]): PartialStateUpdater<ProcessSlice> {
    return state => {
        const process = state.process;         
        if (process === null) return state;   

        const selectedStep = steps.find(s => s.name === stepName);
        if (!selectedStep) return state;

        if (selectedStep.name === process.stepName) return state;

        const updatedProcess = {
            ...process,
            selectedTab: selectedStep.name,
        }

        return {
            process: updatedProcess
        };
    }
}

export function setCurrentStep(stepName: string, steps: StepVm[]): PartialStateUpdater<ProcessSlice> {
    return state => {
        const process = state.process;         
        if (process === null) return state;   

        const selectedStep = steps.find(s => s.name === stepName);
        if (!selectedStep) return state;

        if (selectedStep.name === process.stepName) return state;

        const updatedProcess = {
            ...process, 
            stepName: selectedStep.name,
            step: selectedStep.stepIndex,
            selectedTab: selectedStep.name,
        }

        return {
            process: updatedProcess
        };
    }
}