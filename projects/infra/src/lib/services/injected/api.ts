import { Api } from '@common/api';
import { Model } from '@common/models';
import { InjectionToken } from '@angular/core';

export const API_SERVICE_TOKEN = new InjectionToken<ApiServiceBase>('ApiService');

export interface ApiServiceBase<MAPPER extends Model.ProcessMapper = Model.ProcessMapper> {
    login(input: Api.LoginInput): Promise<Api.LoginOutput<MAPPER>>;

    getProcess(input: Api.GetProcessInput<MAPPER>): Promise<Api.GetProcessOutput<MAPPER>>;

}