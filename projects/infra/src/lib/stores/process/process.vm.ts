import { ConfigInfoTabVm, ConfigStepTabVm } from "../config/config.vm";

export const TAB_STATES = ['disabled', 'enabled', 'active'] as const;

export type TabState = typeof TAB_STATES[number];

export interface ProcessStepTabVm extends ConfigStepTabVm {
  readonly state: TabState;

}

export interface ProcessInfoTabVm extends ConfigInfoTabVm {
  readonly state: TabState;
}

export interface ProcessVm {
    readonly stepTabs: ProcessStepTabVm[];
    readonly infoTabs: ProcessInfoTabVm[];
}