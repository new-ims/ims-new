import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from "@angular/core";
import { BootstrapService } from "../services/bootstrap.service";
import { ApiServiceBase } from "../services/injected/api";
import type { Type } from "@angular/core";
import { provideApi } from "./provide-api";

export interface InfraOptions {
    readonly apiService: Type<ApiServiceBase>
}

export function provideInfra(options: InfraOptions): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideAppInitializer(async () => {
            const bootstrapper = inject(BootstrapService);
            await bootstrapper.start();
        }), 
        provideApi(options.apiService)
    ]);
}