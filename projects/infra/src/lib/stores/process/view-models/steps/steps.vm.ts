import { Type } from "@angular/core";
export const TAB_STATES = ['disabled', 'enabled'] as const;
export type TabState = typeof TAB_STATES[number];


export interface StepVm {
    readonly name: string;
    readonly label: string;
    readonly component: Type<any>;
    readonly state: TabState;
    readonly active: boolean;
    readonly readonly: boolean;
}

export interface ProcessStepsVm {
    readonly steps: StepVm[];
    readonly selectedStep: StepVm | null;
    readonly selectedStepName: string;
    readonly selectedStepIndex: number;
}