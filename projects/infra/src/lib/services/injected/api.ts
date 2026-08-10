import { Api } from '@common/api';
import { Model } from '@common/models';
import { InjectionToken } from '@angular/core';

export const API_SERVICE_TOKEN = new InjectionToken<ApiServiceBase>('ApiService');

export interface ApiServiceBase<MAPPER extends Model.ProcessMapper = Model.ProcessMapper> {
    externalLogin(input: Api.ExternalLoginInput): Promise<Api.ExternalLoginOutput<MAPPER>>;
}