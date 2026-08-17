import { inject, Service } from '@angular/core';
import { API_SERVICE_TOKEN } from './injected/api';
import { getUrlParams } from '@common/utils';
import { ProcessConfig, CONFIG_REGISTRY_TOKEN } from './configuration/config.model';
import { ConfigStore } from '../stores/config/config.store';

@Service()
export class BootstrapService {
  readonly #api = inject(API_SERVICE_TOKEN);
  readonly #registry = inject(CONFIG_REGISTRY_TOKEN);
  readonly #configStore = inject(ConfigStore);

    
  async start() {
    const loginOutput = await this.login();
    console.log('loginOutput', loginOutput);

    const config = await this.loadConfig(loginOutput.processType);
    console.log('config', config);

    const processOutput = await this.loadProcess(loginOutput.processType, loginOutput.processKey);
    console.log('processOutput', processOutput);

    // set the stores
    this.#configStore.setConfig(config, false);
  }

  async login() {
    const params = getUrlParams();
    const login = await this.#api.login({
      params,
    });
    return login;
  }

  async loadConfig(processType: string): Promise<ProcessConfig> {
    const config = await this.#registry[processType]();
    return config;
  }

  async loadProcess(processType: string, processKey: string) {
    const processOutput = await this.#api.getProcess({
      processType,
      processKey,
    });
    return processOutput;
  }
}
