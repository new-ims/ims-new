import { Model } from "@common/models";
import { InjectionToken, Type } from '@angular/core';
import { MaybePromise } from "@common/utils";
import { Adapter } from "@common/adapter";

export interface ProcessInfo<MAPPER extends Model.ProcessMapper, Key extends Model.ProcessTypeKeys<MAPPER>> {
    readonly id: string;
    readonly label: string;
    readonly component?: Type<any>;
    readonly overrideIsEnabled?: ProcessPredicate<MAPPER, Key>;
    readonly overrideIsVisible?: ProcessPredicate<MAPPER, Key>;
}

export type ProcessFunction<MAPPER extends Model.ProcessMapper, Key extends Model.ProcessTypeKeys<MAPPER>> =
    (process: Model.ProcessOf<MAPPER, Key>) => MaybePromise<Model.ProcessOf<MAPPER, Key>>;

export type OnEnterHook<MAPPER extends Model.ProcessMapper, Key extends Model.ProcessTypeKeys<MAPPER>> = 
    ProcessFunction<MAPPER, Key>;

export type OnCompleteHook<MAPPER extends Model.ProcessMapper, Key extends Model.ProcessTypeKeys<MAPPER>> =
    ProcessFunction<MAPPER, Key>;

export type CommentedPredicateResult = [boolean, string];


export type ProcessPredicate<MAPPER extends Model.ProcessMapper = Model.ProcessMapper, Key extends Model.ProcessTypeKeys<MAPPER> = string> =
    (process: Model.ProcessOf<MAPPER, Key>, login: Adapter.UserInfo) => CommentedPredicateResult;


export interface ProcessStep<MAPPER extends Model.ProcessMapper, Key extends Model.ProcessTypeKeys<MAPPER>> {
    readonly name: string;
    readonly label: string;
    readonly alwaysEnabled?: boolean;
    readonly component?: Type<any>;
    readonly overrideIsEnabled?: ProcessPredicate<MAPPER, Key>;
    readonly overrideReadonly?: ProcessPredicate<MAPPER, Key>;
}

export interface ProcessConfig<MAPPER extends Model.ProcessMapper = Model.ProcessMapper, Key extends Model.ProcessTypeKeys<MAPPER> = string> {
    readonly processType: Key;
    readonly processName: string;    
    readonly steps: ProcessStep<MAPPER, Key>[];
    readonly infos: ProcessInfo<MAPPER, Key>[];
    readonly verifyInsured: boolean;
    readonly overrideIsEnabled?: ProcessPredicate<MAPPER, Key>;
    readonly overrideReadonly?: ProcessPredicate<MAPPER, Key>;
}

export type ProcessConfigWithoutType<MAPPER extends Model.ProcessMapper = Model.ProcessMapper, 
    Key extends Model.ProcessTypeKeys<MAPPER> = string> = Omit<ProcessConfig<MAPPER, Key>, 'processType'>;

export type ProcessConfigFactory<MAPPER extends Model.ProcessMapper, Key extends Model.ProcessTypeKeys<MAPPER>> = 
    () => ProcessConfig<MAPPER, Key>;

// define ConfigRegistry as a mapping of processType to ProcessConfigFactory
export type ConfigRegistry<MAPPER extends Model.ProcessMapper = Model.ProcessMapper> = {
    [K in Model.ProcessTypeKeys<MAPPER>]: () => Promise<ProcessConfig<MAPPER, K>>;
};

export const CONFIG_REGISTRY_TOKEN = new InjectionToken<ConfigRegistry>('CONFIG_REGISTRY_TOKEN');
