import { DefaultStep } from "../../components/process/default-step/default-step";
import { ProcessConfig } from "../../services/configuration/config.model";
import { ConfigVm, emptyConfigVm, ConfigInfoTabVm, ConfigStepTabVm } from "./config.vm";

export function configVmFromSlice(processConfig: ProcessConfig | null): ConfigVm {
    if (!processConfig) return emptyConfigVm;
    
    const infoTabs: ConfigInfoTabVm[] = processConfig.infos.map(info => ({
        id: info.id,
        label: info.label,
        component: info.component, 
        overrideIsEnabled: info.overrideIsEnabled ?? null,
        overrideIsVisible: info.overrideIsVisible ?? null
    }));
    const stepTabs: ConfigStepTabVm[] = processConfig.steps.map(step => ({
        name: step.name,
        label: step.label,
        alwaysEnabled: step.alwaysEnabled || false,
        component: step.component ?? DefaultStep, 
        overrideIsEnabled: step.overrideIsEnabled ?? null,
        overrideReadonly: step.overrideReadonly ?? null,
    }));

 
    return {
        stepTabs,
        infoTabs,
        processType: processConfig.processType,
        processName: processConfig.processName,
        verifyInsured: processConfig.verifyInsured,
        overrideIsEnabled: processConfig.overrideIsEnabled ?? null,
        overrideReadonly: processConfig.overrideReadonly ?? null
    };
}
