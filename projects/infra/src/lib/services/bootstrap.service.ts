import { inject, Service } from '@angular/core';
import { API_SERVICE_TOKEN } from './injected/api';
import { getUrlParams } from '@common/utils';
import { ProcessConfig, CONFIG_REGISTRY_TOKEN } from './configuration/config.model';

@Service()
export class BootstrapService {
  readonly #api = inject(API_SERVICE_TOKEN);
  readonly #registry = inject(CONFIG_REGISTRY_TOKEN);

    
  async start() {
    const loginOutput = await this.login();
    console.log('loginOutput', loginOutput);

    const config = await this.loadConfig(loginOutput.processType);
    console.log('config', config);
  }

  async login() {
    const params = getUrlParams();
    const login = await this.#api.login({
      params,
    });
    return login;
  }

  async loadConfig(processType: string): Promise<ProcessConfig> {
    const configFactory = await this.#registry[processType]();
    const config = await configFactory();
    return config;
  }
}
