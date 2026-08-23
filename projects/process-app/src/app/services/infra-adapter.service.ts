import { Service } from '@angular/core';
import { FakeModels } from '@fake-models';
import { delay } from '@common/utils';
import { MOCK_PROCESSES } from '../../mock-data/processes';
import type { InfraAdapterBase } from '@infra';
import { Adapter } from '@common/adapter';

@Service()
export class InfraAdapterService implements InfraAdapterBase<FakeModels.FakeProcesses> {
  async login(input: Adapter.LoginInput): Promise<Adapter.LoginOutput<FakeModels.FakeProcesses>> {
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
    input: Adapter.GetProcessInput<FakeModels.FakeProcesses>,
  ): Promise<Adapter.GetProcessOutput<FakeModels.FakeProcesses>> {
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
