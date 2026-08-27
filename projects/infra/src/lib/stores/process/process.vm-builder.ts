import { ProcessInfoTabVm, ProcessVm } from "./process.vm";
import { ConfigVm } from "../config/config.vm";
import { ProcessStepTabVm } from "./process.vm";

export function buildProcessVm(configVm: ConfigVm): ProcessVm {
    const stepTabs: ProcessStepTabVm[] = configVm.stepTabs.map(stepTab => ({
        ...stepTab,
        state: 'enabled',
    }));

    const infoTabs: ProcessInfoTabVm[] = configVm.infoTabs.map(infoTab => ({
        ...infoTab,
        state: 'enabled',
    }));    

    return {
        stepTabs,
        infoTabs,
    };
}