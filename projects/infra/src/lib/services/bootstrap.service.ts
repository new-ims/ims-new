import { inject, Service } from '@angular/core';
import { getUrlParams } from '@common/utils';
import { ProcessConfig, CONFIG_REGISTRY_TOKEN } from './configuration/config.model';
import { ConfigStore } from '../stores/config/config.store';
import { INFRA_ADAPTER_TOKEN } from './injected/infra-adapter';
import { ProcessStore } from '../stores/process/process.store';
import { UserStore } from '../stores/user/user.store';

@Service()
  export class BootstrapService {
  readonly #adapter = inject(INFRA_ADAPTER_TOKEN);
  readonly #registry = inject(CONFIG_REGISTRY_TOKEN);
  readonly #configStore = inject(ConfigStore);
  readonly #processStore = inject(ProcessStore);
  readonly #userStore = inject(UserStore);

    
  async start() {
    const loginOutput = await this.login();
    console.log('loginOutput', loginOutput);

    const config = await this.loadConfig(loginOutput.processType);
    console.log('config', config);

    const processOutput = await this.loadProcess(loginOutput.processType, loginOutput.processKey);
    console.log('processOutput', processOutput);

    // set the stores
    this.#userStore.setUserInfo(loginOutput.userInfo);
    this.#configStore.setConfig(config);
    const process = processOutput.process;
    this.#processStore.resetProcess(process);
  }

  async login() {
    const params = getUrlParams();
    const login = await this.#adapter.login({
      params,
    });
    return login;
  }

  async loadConfig(processType: string): Promise<ProcessConfig> {
    const config = await this.#registry[processType]();
    return config;
  }

  async loadProcess(processType: string, processKey: string) {
    const processOutput = await this.#adapter.getProcess({
      processType,
      processKey,
    });
    return processOutput;
  }
}
