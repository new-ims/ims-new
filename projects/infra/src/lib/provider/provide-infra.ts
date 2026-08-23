import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer, Type } from "@angular/core";
import { CONFIG_REGISTRY_TOKEN } from "../services/configuration/config.model";
import { BootstrapService } from "../services/bootstrap.service";
import type { Model } from "@common/models";
import { ConfigRegistry } from "../services/configuration/config.model";
import { INFRA_ADAPTER_TOKEN, InfraAdapterBase } from "../services/injected/infra-adapter";

export interface InfraOptions<MAPPER extends Model.ProcessMapper> {
    readonly adapterService: Type<InfraAdapterBase<MAPPER>>;
    readonly registry: ConfigRegistry<MAPPER>;
}

export function provideInfra<MAPPER extends Model.ProcessMapper>(
    adapterProvider: AdapterProvider<MAPPER>,
    configProvider: ConfigRegistryProvider<MAPPER>

): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideAppInitializer(async () => {
            const bootstrapper = inject(BootstrapService);
            await bootstrapper.start();
        }), 
        adapterProvider,
        configProvider
    ]);
}


export type AdapterProvider<MAPPER extends Model.ProcessMapper> = {
    provide: typeof INFRA_ADAPTER_TOKEN;
    useClass: Type<InfraAdapterBase<MAPPER>>;
}

export function withAdapter<MAPPER extends Model.ProcessMapper>(adapterService: Type<InfraAdapterBase<MAPPER>>): AdapterProvider<MAPPER> {
    return {
        provide: INFRA_ADAPTER_TOKEN,
        useClass: adapterService
    }
}

export type ConfigRegistryProvider<MAPPER extends Model.ProcessMapper> = {
    provide: typeof CONFIG_REGISTRY_TOKEN;
    useValue: ConfigRegistry<MAPPER>;
}

export function withConfigs<MAPPER extends Model.ProcessMapper>(registry: ConfigRegistry<MAPPER>): ConfigRegistryProvider<MAPPER> {
    return {
        provide: CONFIG_REGISTRY_TOKEN,
        useValue: registry
    }
}