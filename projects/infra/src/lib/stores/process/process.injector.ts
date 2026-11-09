import { Model } from '@common/models';
import { KnownProcessStore, ProcessStore } from './process.store';
import { inject } from '@angular/core';

/**
 * Injects the process store typed to `P` — a single process type or a union of them,
 * e.g. `injectProcessStore<HolidayProcess>()` or `injectProcessStore<FakeMapper>()`.
 */
export function injectProcessStore<P extends Model.BaseProcess = Model.BaseProcess>(): KnownProcessStore<P> {
    return inject(ProcessStore) as unknown as KnownProcessStore<P>;
}



