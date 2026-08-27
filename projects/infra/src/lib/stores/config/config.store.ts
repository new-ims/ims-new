import { signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { computed, signal } from '@angular/core';
import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { ProcessConfig } from '../../services/configuration/config.model';
import { initialConfigSlice } from './config.slice';
import { configVmFromSlice } from './config.vm-builder';

export const ConfigStore = signalStore(
  { providedIn: 'root' },
  withState(initialConfigSlice),
  withComputed((store) => ({
    configVm: computed(() => configVmFromSlice(store.config())),
  })),
  withMethods((store) => ({
    setConfig(config: ProcessConfig) {
      updateState(store, '[Config] Set Config', { config });
    },
  })),
  withDevtools('ConfigStore')
);
