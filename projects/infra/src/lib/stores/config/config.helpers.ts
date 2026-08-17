import { ProcessConfig } from "../../services/configuration/config.model";

export function configSliceFromProcessConfig(processConfig: ProcessConfig, isHistorical: boolean) {
    const infoTabs = processConfig.infos.map(info => ({
        id: info.id,
        label: info.label,
        component: info.component
    }));
    const stepTabs = processConfig.steps.map(step => ({
        id: step.id,
        name: step.name,
        label: step.label,
        alwaysEnabled: step.alwaysEnabled || false,
        component: step.component
    }));

 
    return {
        stepTabs,
        infoTabs,
        processType: processConfig.processType,
        processName: processConfig.processName
    };
}
