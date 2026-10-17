import { inject, Signal } from '@angular/core';
import { Model } from '@common/models';
import { ProcessConfig } from '../configuration/config.model';
import { LookupsService } from './lookups.service';

export function getLookup<
  MAPPER extends Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER>,
  Lookup extends Record<string, unknown>,
  LookupKey extends keyof Lookup,
>(
  config: ProcessConfig<MAPPER, Key, Lookup>,
  lookupKey: LookupKey,
): Signal<Lookup[LookupKey]> {
  const lookupService = inject(LookupsService);
  return lookupService.getValue(config, lookupKey);
}

export function ensureLookups<
  MAPPER extends Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER>,
  Lookup extends Record<string, unknown>,
>(
  config: ProcessConfig<MAPPER, Key, Lookup>,
  keys: readonly (keyof Lookup)[],
): Signal<boolean> {
  const lookupService = inject(LookupsService);
  return lookupService.ensureResources(config, keys);
}
