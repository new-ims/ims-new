import { Model } from '@common/models';
import { KnownProcessStore, ProcessStore } from './process.store';
import { inject } from '@angular/core';

export function injectProcessStore<
  MAPPER extends Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER>,
>(type: Key): KnownProcessStore<MAPPER, Key> {
    return inject(ProcessStore) as unknown as KnownProcessStore<MAPPER, Key>;
}
