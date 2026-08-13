import { inject, Service } from '@angular/core';
import { API_SERVICE_TOKEN } from './injected/api';
import { getUrlParams } from '@common/utils';

@Service()
export class BootstrapService {
  readonly #api = inject(API_SERVICE_TOKEN);


  async start() {
    const loginOutput = await this.login();


  }

  async login() {
    const params = getUrlParams();
    const login = await this.#api.login({
      params,
    });
    return login;
  }
}
