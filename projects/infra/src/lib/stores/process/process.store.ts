import { signalStore, withMethods, withState } from '@ngrx/signals';
import { initialProcessSlice } from './process.slice';
import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { Model } from '@common/models';
import { Override } from '@common/utils';

export const ProcessStore = signalStore(
  { providedIn: 'root' },
  withState(initialProcessSlice()),
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
  typeof ProcessStore,
  {
    process: Model.ProcessOf<MAPPER, Key>;
    resetProcess: (process: Model.ProcessOf<MAPPER, Key>) => void;
  }
>;
