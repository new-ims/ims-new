import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideApi, provideInfra } from '@infra';
import { ApiService } from './services/api.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideInfra({
      apiService: ApiService
    }),
  ],
};
