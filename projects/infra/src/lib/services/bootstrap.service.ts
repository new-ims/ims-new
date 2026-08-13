import { inject, Service } from "@angular/core";
import { API_SERVICE_TOKEN } from "./injected/api";
import { getUrlParams } from "@common/utils";

@Service()
export class BootstrapService {
    async start() {
        const api = inject(API_SERVICE_TOKEN);
        const params = getUrlParams();
        const login = await api.login({
            params
        });
        console.log("BootstrapService.start: externalLogin result:", login);        
    }
}