import { Type } from "@angular/core";
import { Model } from "@common/models";

export interface ConfigSlice {
  readonly stepTabs: StepTab[];
  readonly infoTabs: InfoTab[];
  readonly processType: Model.ProcessType | null;
  readonly processName: string;
  readonly isInitialized: boolean;
}

export interface StepTab {
  readonly id: number;
  readonly name: string;
  readonly label: string;
  readonly alwaysEnabled: boolean;
  readonly component: Type<any>;
}

export interface InfoTab {
  readonly id: string;
  readonly label: string;
  readonly component: Type<any>;
}

export const initialConfigSlice: ConfigSlice = {
  stepTabs: [],
  infoTabs: [],
  processType: null,
  processName: '',
  isInitialized: false,
};
