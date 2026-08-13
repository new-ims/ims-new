import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from "@angular/core";
import { CONFIG_REGISTRY_TOKEN } from "../services/configuration/config.model";
import { BootstrapService } from "../services/bootstrap.service";
import { API_SERVICE_TOKEN, ApiServiceBase } from "../services/injected/api";
import type { Provider, Type } from "@angular/core";
import type { Model } from "@common/models";
import { provideApi } from "./provide-api";
import { ConfigRegistry } from "../services/configuration/config.model";

export interface InfraOptions<MAPPER extends Model.ProcessMapper> {
    readonly apiService: Type<ApiServiceBase>;
    readonly registry: ConfigRegistry<MAPPER>;
}

export function provideInfra<MAPPER extends Model.ProcessMapper>(
    apiProvider: ApiProvider<MAPPER>,
    configProvider: ConfigRegistryProvider<MAPPER>

): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideAppInitializer(async () => {
            const bootstrapper = inject(BootstrapService);
            await bootstrapper.start();
        }), 
        apiProvider,
        configProvider
    ]);
}


export type ApiProvider<MAPPER extends Model.ProcessMapper> = {
    provide: typeof API_SERVICE_TOKEN;
    useClass: Type<ApiServiceBase<MAPPER>>;
}

export function withApi<MAPPER extends Model.ProcessMapper>(apiService: Type<ApiServiceBase<MAPPER>>): ApiProvider<MAPPER> {
    return {
        provide: API_SERVICE_TOKEN,
        useClass: apiService
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