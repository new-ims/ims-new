import { FakeModels } from "@fake-models";
import { ProcessConfig } from "@infra";

export const config: () => ProcessConfig<FakeModels.FakeProcesses, 'radiant-health'> = () => ({
    processType: 'radiant-health',
    processName: 'Radiant Health Process',
    steps: [], 
    infos: []
});
