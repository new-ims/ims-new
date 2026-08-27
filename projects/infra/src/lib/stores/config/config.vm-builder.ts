import { DefaultStep } from "../../components/process/default-step/default-step";
import { ProcessConfig } from "../../services/configuration/config.model";
import { ConfigVm, emptyConfigVm, ConfigInfoTabVm, ConfigStepTabVm } from "./config.vm";

export function configVmFromSlice(processConfig: ProcessConfig | null): ConfigVm {
    if (!processConfig) return emptyConfigVm;
    
    const infoTabs: ConfigInfoTabVm[] = processConfig.infos.map(info => ({
        id: info.id,
        label: info.label,
        component: info.component
    }));
    const stepTabs: ConfigStepTabVm[] = processConfig.steps.map(step => ({
        name: step.name,
        label: step.label,
        alwaysEnabled: step.alwaysEnabled || false,
        component: step.component ?? DefaultStep
    }));

 
    return {
        stepTabs,
        infoTabs,
        processType: processConfig.processType,
        processName: processConfig.processName
    };
}
