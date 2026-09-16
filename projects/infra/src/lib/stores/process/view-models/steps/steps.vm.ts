import { Type } from "@angular/core";

export interface StepVm {
    readonly name: string;
    readonly label: string;
    readonly component: Type<any>;
    readonly isEnabled: boolean;
    readonly isActive: boolean;
    readonly isReadonly: boolean;
    readonly debugComments: Record<string, string>;
}

export interface ProcessStepsVm {
    readonly steps: StepVm[];
    readonly selectedStep: StepVm | null;
    readonly selectedStepName: string;
    readonly selectedStepIndex: number;
}