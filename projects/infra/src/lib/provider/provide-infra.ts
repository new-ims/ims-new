import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from "@angular/core";
import { BootstrapService } from "../services/bootstrap.service";

export function provideInfra(): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideAppInitializer(async () => {
            const bootstrapper = inject(BootstrapService);
            await bootstrapper.start();
        })
    ]);
}