import { Type } from "@angular/core";
import { Model } from "@common/models";

export interface ConfigVm {
  readonly stepTabs: ConfigStepTabVm[];
  readonly infoTabs: ConfigInfoTabVm[];
  readonly processType: Model.ProcessType | null;
  readonly processName: string;
}

export interface ConfigStepTabVm {
  readonly name: string;
  readonly label: string;
  readonly alwaysEnabled: boolean;
  readonly component: Type<any>;
}

export interface ConfigInfoTabVm {
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
