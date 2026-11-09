import { Model } from '@common/models';
import { ProcessConfig, ProcessConfigWithoutType } from './config.model';

type DefineConfig<
  MAPPER extends Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER>,
> = <Lookup extends Record<string, unknown> = {}>(
  config: ProcessConfigWithoutType<MAPPER, Key, Lookup>,
) => ProcessConfigWithoutType<MAPPER, Key, Lookup>;

function builder<MAPPER extends Model.ProcessMapper>() {
  return <Lookup extends Record<string, unknown> = {}>(
    factory: <Key extends Model.ProcessTypeKeys<MAPPER>>(
      define: DefineConfig<MAPPER, Key>,
    ) => ProcessConfigWithoutType<MAPPER, Key, Lookup>,
  ) =>
    <Key extends Model.ProcessTypeKeys<MAPPER>>(
      processType: Key,
    ): ProcessConfig<MAPPER, Key, Lookup> =>
      createConfig<MAPPER, Key, Lookup>(processType, () => factory<Key>(config => config));
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
