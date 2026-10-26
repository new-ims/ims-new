import {
  computed,
  inject,
  Injector,
  resource,
  ResourceRef,
  runInInjectionContext,
  Service,
  Signal,
  signal,
} from '@angular/core';
import { Model } from '@common/models';
import { ProcessConfig } from '../configuration/config.model';
import { waitForResources } from '../../utils';
import { ProcessStore } from '../../stores/process/process.store';

export type ResourceMap = Readonly<Record<PropertyKey, ResourceRef<unknown> | undefined>>;

@Service()
export class LookupsService {
  readonly #injector = inject(Injector);
  readonly #resources = signal<ResourceMap>({});
  readonly #processStore = inject(ProcessStore);

  ensureResources<
    MAPPER extends Model.ProcessMapper,
    Key extends Model.ProcessTypeKeys<MAPPER>,
    Lookup extends Record<string, unknown>,
  >(
    config: ProcessConfig<MAPPER, Key, Lookup>,
    keys: readonly (keyof Lookup)[],
  ): Signal<boolean> {
    for (const key of keys) {
      this.getResource(config, key);
    }
    return this.getResourcesStatus(config, keys);
  }

  awaitResources<
    MAPPER extends Model.ProcessMapper,
    Key extends Model.ProcessTypeKeys<MAPPER>,
    Lookup extends Record<string, unknown>,
  >(
    config: ProcessConfig<MAPPER, Key, Lookup>,
    keys: readonly (keyof Lookup)[],
  ): Promise<void> {
    const resources = keys.map((key) => this.getResource(config, key));
    return waitForResources(resources);
  } 

  getResourcesStatus<
    MAPPER extends Model.ProcessMapper,
    Key extends Model.ProcessTypeKeys<MAPPER>,
    Lookup extends Record<string, unknown>,
  >(
    config: ProcessConfig<MAPPER, Key, Lookup>,
    keys: readonly (keyof Lookup)[],
  ): Signal<boolean> {
    const resources = keys.map((key) => this.getResource(config, key));
    return computed(() => resources.every((lookupResource) => lookupResource.status() === 'resolved'));
  }

  getResource<
    MAPPER extends Model.ProcessMapper,
    Key extends Model.ProcessTypeKeys<MAPPER>,
    Lookup extends Record<string, unknown>,
    LookupKey extends keyof Lookup,
  >(
    config: ProcessConfig<MAPPER, Key, Lookup>,
    key: LookupKey,
  ): ResourceRef<Lookup[LookupKey]> {
    this.#resources.update((resources) => {
      if (Object.hasOwn(resources, key)) {
        return resources;
      }

      const lookupConfig = config.lookups?.[key];
      if (!config.lookups || !Object.hasOwn(config.lookups, key) || !lookupConfig) {
        throw new Error(
          `Lookup "${String(key)}" is not configured for process "${config.processType}".`,
        );
      }

      return {
        ...resources,
        [key]: resource({
          defaultValue: lookupConfig.default,
          loader: async () => runInInjectionContext(this.#injector, 
            () => lookupConfig.getter(this.#processStore.process() as Model.ProcessOf<MAPPER, Key>)), 
          injector: this.#injector,
        }),
      };
    });

    // Each cache key must consistently identify the same lookup value type.
    return this.#resources()[key] as ResourceRef<Lookup[LookupKey]>;
  }

  getValue<
    MAPPER extends Model.ProcessMapper,
    Key extends Model.ProcessTypeKeys<MAPPER>,
    Lookup extends Record<string, unknown>,
    LookupKey extends keyof Lookup,
  >(
    config: ProcessConfig<MAPPER, Key, Lookup>,
    key: LookupKey,
  ): Signal<Lookup[LookupKey]> {
    return this.getResource(config, key).value;
  }
}