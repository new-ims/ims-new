import { Type } from "@angular/core";
import { ConfigStepTabVm } from "../../../config/config.vm";

export interface StepVm extends ConfigStepTabVm {
    readonly name: string;
    readonly label: string;
    readonly stepIndex: number;
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