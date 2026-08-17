import { Model } from '@common/models';
import { ProcessConfig, ProcessConfigWithoutType } from './config.model';

export function processes<MAPPER extends Model.ProcessMapper>() {
    return {
        config: <Key extends Model.ProcessTypeKeys<MAPPER>>(processType: Key, configFactory: () => ProcessConfigWithoutType<MAPPER, Key>): ProcessConfig<MAPPER, Key> => {
            return createConfig(processType, configFactory);
        }
    }
}

export function createConfig<MAPPER extends Model.ProcessMapper, Key extends Model.ProcessTypeKeys<MAPPER>>(
    processType: Key,
    configFactory: () => ProcessConfigWithoutType<MAPPER, Key>
): ProcessConfig<MAPPER, Key> {
    const configWithoutType = configFactory();
    return {
        processType,
        ...configWithoutType
    };
}