import { EnvironmentProviders, makeEnvironmentProviders, Type } from "@angular/core";
import { API_SERVICE_TOKEN, ApiServiceBase } from "../services/injected/api";

export function provideApi(type: Type<ApiServiceBase>): EnvironmentProviders {
    return makeEnvironmentProviders([
        { provide: API_SERVICE_TOKEN, useClass: type }
    ]);
}