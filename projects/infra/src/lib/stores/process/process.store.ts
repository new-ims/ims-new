import { signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { initialProcessSlice } from './process.slice';
import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { Model } from '@common/models';
import { Override } from '@common/utils';
import { computed, inject } from '@angular/core';
import { ConfigStore } from '../config/config.store';
import { buildProcessVm } from './process.vm-builder';

export const ProcessStore = signalStore(
  { providedIn: 'root' },
  withState(initialProcessSlice()),
  withProps(_ => ({
    _configVm: inject(ConfigStore).configVm
  })),
  withComputed(store => ({
    processVm: computed(() => buildProcessVm(store._configVm())),
  })),
  withMethods((store) => ({
    resetProcess: (process: Model.BaseProcess) => {
      updateState(store, 'Reset Process', { process });
    },
  })),
  withDevtools('ProcessStore'),
);

export type KnownProcessStore<
  MAPPER extends Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER>,
> = Override<
  InstanceType<typeof ProcessStore>,
  {    
    process: Model.ProcessOf<MAPPER, Key>;
    resetProcess: (process: Model.ProcessOf<MAPPER, Key>) => void;
  }
>;
