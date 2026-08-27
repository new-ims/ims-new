import { Model } from '@common/models';
import { KnownProcessStore, ProcessStore } from './process.store';
import { inject } from '@angular/core';

// Known key -> exact process type.
export function injectProcessStore<
  MAPPER extends Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER>,
>(type: Key): KnownProcessStore<MAPPER, Key>;
// No key -> store narrowed only to the mapper's possible process types.
export function injectProcessStore<
  MAPPER extends Model.ProcessMapper,
>(): KnownProcessStore<MAPPER, Model.ProcessTypeKeys<MAPPER>>;
export function injectProcessStore<
  MAPPER extends Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER>,
>(type?: Key): KnownProcessStore<MAPPER, Key> {
    return inject(ProcessStore) as unknown as KnownProcessStore<MAPPER, Key>;
}



