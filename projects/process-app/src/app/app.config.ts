import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideInfra, withApi, withConfigs } from '@infra';
import { ApiService } from './services/api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideInfra(
      withApi(ApiService), 
      withConfigs({
        'holiday': () => import('./processes/holiday/config').then(m => m.holidayConfig),
        'radiant-health': () => import('./processes/radiant-health/config').then(m => m.radiantHealthConfig)
      })
    ),
  ],
};


// provideInfra<FakeProcesses>(
//   withApi(ApiService), 
//   withConfigs({
//      'holiday': () => import('./processes/holiday/config').then(m => m.config), 
//      'radiant-health': () => import('./processes/radiant-health/config').then(m => m.config)
//   })
// )
