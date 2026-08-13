import { Service } from '@angular/core';
import { ApiServiceBase } from '@infra';
import { FakeModels } from '@fake-models';
import { Api } from '@common/api';
import { delay } from '@common/utils';
import { MOCK_PROCESSES } from '../../mock/processes';

@Service()
export class ApiService implements ApiServiceBase<FakeModels.FakeProcesses> {
  async login(input: Api.LoginInput): Promise<Api.LoginOutput<FakeModels.FakeProcesses>> {
    await delay(1000); // Simulate network delay
    const processes = MOCK_PROCESSES;
    const key = input.params['key'];
    const process = processes.find((p) => p.processKey.includes(key)) ?? processes[0];
    return {
      processKey: process.processKey,
      processType: process.processType,
    };
  }

  async getProcess(
    input: Api.GetProcessInput<FakeModels.FakeProcesses>,
  ): Promise<Api.GetProcessOutput<FakeModels.FakeProcesses>> {
    const process = MOCK_PROCESSES.find((p) => p.processType === input.processType && p.processKey === input.processKey);
    if (!process) {
      throw new Error(`Process not found for type: ${input.processType} and key: ${input.processKey}`);
    }

    await delay(1000); // Simulate network delay
    return {
      process,
    };
  }
}
