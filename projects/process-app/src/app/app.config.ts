import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideApi, provideInfra } from '@infra';
import { ApiService } from './services/api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideInfra(), 
    provideApi(ApiService)
  ],
};
