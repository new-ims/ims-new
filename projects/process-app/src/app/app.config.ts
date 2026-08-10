import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideInfra } from '@infra';
import { ApiService } from './services/api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideInfra({
      apiService: ApiService
    }),
  ],
};
