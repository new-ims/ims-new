import { signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { initialConfigSlice } from './config.slice';
import { signal } from '@angular/core';
import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { ProcessConfig } from '../../services/configuration/config.model';
import { configSliceFromProcessConfig } from './config.helpers';

export const ConfigStore = signalStore(
  { providedIn: 'root' },
  withState(initialConfigSlice),
  withProps(_ => ({
    config: signal<ProcessConfig | null>(null),
  })),
  withComputed((store) => ({
  })),
  withMethods((store) => ({
    setConfig(config: ProcessConfig, isHistorical: boolean) {
      store.config.set(config);
      const slice = configSliceFromProcessConfig(config, isHistorical);
      updateState(store, '[Config] Set Config', slice);
    },
    setIsInitialized(isInitialized: boolean) {
      updateState(store, '[Config] Set Is Initialized', { isInitialized });
    }
  })),
  withDevtools('ConfigStore')
);
