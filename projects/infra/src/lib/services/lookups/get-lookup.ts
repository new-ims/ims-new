import { Signal, signal } from '@angular/core';
import { Model } from '@common/models';
import { ProcessConfig } from '../configuration/config.model';

export function getLookup<
  MAPPER extends Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER>,
  Lookup extends Record<string, unknown>,
  LookupKey extends keyof Lookup,
>(
  config: ProcessConfig<MAPPER, Key, Lookup>,
  lookupKey: LookupKey,
): Signal<Lookup[LookupKey]> {
    throw "not implemented";
}
