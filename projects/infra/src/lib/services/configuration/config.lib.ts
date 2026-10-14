import { Model } from '@common/models';
import { ProcessConfig, ProcessConfigWithoutType } from './config.model';

export function processes<MAPPER extends Model.ProcessMapper>() {
  return {
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
