import { inject, Signal } from '@angular/core';
import { Model } from '@common/models';
import { ProcessConfig, RequiredLookups } from '../configuration/config.model';
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

export function awaitLookups<
  MAPPER extends Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER>,
  Lookup extends Record<string, unknown>,
>(
  config: ProcessConfig<MAPPER, Key, Lookup>,
  keys: readonly (keyof Lookup)[],
): Promise<void> {
  const lookupService = inject(LookupsService);
  return lookupService.awaitResources(config, keys);
}

export type RequiredLookupKeyGroup<Lookup extends Record<string, unknown>> = {
  before: (keyof Lookup)[];
  afterEnter: (keyof Lookup)[];
}
export function getRequiredLookupKeyGroups<Lookup extends Record<string, unknown>>(config: RequiredLookups<Lookup>): RequiredLookupKeyGroup<Lookup> {
  const before = config.filter(item => typeof item === 'string') as (keyof Lookup)[];
  const afterEnter = config.filter(item => typeof item === 'object' && item.timing === 'afterEnter').map(item => (item as { key: keyof Lookup }).key);
  return { before, afterEnter };
}