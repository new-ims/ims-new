import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideInfra, withAdapter, withConfigs } from '@infra';
import { InfraAdapterService } from './services/infra-adapter.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideInfra(
      withAdapter(InfraAdapterService), 
      withConfigs({
        'holiday': () => import('./processes/holiday/config').then(m => m.holidayConfig),
        'radiant-health': () => import('./processes/radiant-health/config').then(m => m.radiantHealthConfig)
      })
    ),
  ],
};
