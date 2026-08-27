import { Type } from "@angular/core";
import { Model } from "@common/models";

export interface ConfigVm {
  readonly stepTabs: StepTabVm[];
  readonly infoTabs: InfoTabVm[];
  readonly processType: Model.ProcessType | null;
  readonly processName: string;
}

export interface StepTabVm {
  readonly name: string;
  readonly label: string;
  readonly alwaysEnabled: boolean;
  readonly component: Type<any>;
}

export interface InfoTabVm {
  readonly id: string;
  readonly label: string;
  readonly component: Type<any>;
}

export const emptyConfigVm: ConfigVm = {
  stepTabs: [],
  infoTabs: [],
  processType: null,
  processName: '',
};
