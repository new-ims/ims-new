import { FakeModels } from "@fake-models";
import { ProcessConfig } from "@infra";

export const config: () => ProcessConfig<FakeModels.FakeProcesses, 'holiday'> = () => ({
    processType: 'holiday',
    processName: 'Holiday Process',
    steps: [], 
    infos: []
});
