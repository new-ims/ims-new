import { EnvironmentProviders, makeEnvironmentProviders, Type } from "@angular/core";

import { INFRA_ADAPTER_TOKEN, InfraAdapterBase } from "../services/injected/infra-adapter";

export function provideInfraAdapter(type: Type<InfraAdapterBase>): EnvironmentProviders {
    return makeEnvironmentProviders([
        { provide: INFRA_ADAPTER_TOKEN, useClass: type }
    ]);
}