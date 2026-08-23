import { Model } from '@common/models';
import { InjectionToken } from '@angular/core';
import { Adapter } from '@common/adapter';

export const INFRA_ADAPTER_TOKEN = new InjectionToken<InfraAdapterBase>('INFRA_ADAPTER_TOKEN');

export interface InfraAdapterBase<MAPPER extends Model.ProcessMapper = Model.ProcessMapper> {
    login(input: Adapter.LoginInput): Promise<Adapter.LoginOutput<MAPPER>>;

    getProcess(input: Adapter.GetProcessInput<MAPPER>): Promise<Adapter.GetProcessOutput<MAPPER>>;

}