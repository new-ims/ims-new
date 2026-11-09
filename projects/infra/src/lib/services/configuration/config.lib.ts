import { Model } from '@common/models';
import { ProcessConfig, ProcessConfigWithoutType } from './config.model';

/**
 * Builds a shared config for a group of process types.
 *
 * Usage: `processes<M>().builder<GROUP>()(() => ({ ...config }))` returns a function
 * `(processType) => ProcessConfig` restricted to the keys of `GROUP`.
 *
 * The call is curried because `GROUP` must be given explicitly while `Lookup` must be
 * inferred from the config literal; TypeScript does not support partial inference.
 */
function builder<GROUP extends Model.ProcessMapper>() {
  type Keys = Model.ProcessTypeKeys<GROUP>;
  type GroupFactory<Lookup extends Record<string, unknown>> = () => ProcessConfigWithoutType<
    GROUP,
    Keys,
    Lookup
  >;
  type KeyFactory<
    Key extends Keys,
    Lookup extends Record<string, unknown>,
  > = () => ProcessConfigWithoutType<GROUP, Key, Lookup>;

  return <Lookup extends Record<string, unknown> = {}>(factory: GroupFactory<Lookup>) =>
    <Key extends Keys>(processType: Key): ProcessConfig<GROUP, Key, Lookup> =>
      // The factory is written against the whole group; narrowing it to a single key is safe
      // for callback parameters (contravariant) and reflects the author's intent for results.
      createConfig<GROUP, Key, Lookup>(processType, factory as KeyFactory<Key, Lookup>);
}

export function processes<MAPPER extends Model.ProcessMapper>() {
  return {
    builder: <GROUP extends MAPPER>() => builder<GROUP>(),
    config: <Key extends Model.ProcessTypeKeys<MAPPER>, Lookup extends Record<string, unknown>>(
      processType: Key,
      configFactory: () => ProcessConfigWithoutType<MAPPER, Key, Lookup>,
    ): ProcessConfig<MAPPER, Key, Lookup> => {
      return createConfig<MAPPER, Key, Lookup>(processType, configFactory);
    },
  };
}

export function createConfig<
  MAPPER extends Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER>,
  Lookup extends Record<string, unknown>,
>(
  processType: Key,
  configFactory: () => ProcessConfigWithoutType<MAPPER, Key, Lookup>,
): ProcessConfig<MAPPER, Key, Lookup> {
  const configWithoutType = configFactory();
  return {
    processType,
    ...configWithoutType,
  };
}
