import { inject, Service } from "@angular/core";
import { API_SERVICE_TOKEN } from "./injected/api";

@Service()
export class BootstrapService {
    async start() {
        const api = inject(API_SERVICE_TOKEN);
        const login = await api.externalLogin({
            sessionManagerId: 'blablabla',
        });
        console.log("BootstrapService.start: externalLogin result:", login);        
    }
}