import { Model } from "@common/models";
import { InjectionToken, Type } from '@angular/core';
import { MaybePromise } from "@common/utils";

export interface ProcessInfo {
    readonly id: string;
    readonly label: string;
    readonly component: Type<any>;
}

export type ProcessFunction<MAPPER extends Model.ProcessMapper, Key extends Model.ProcessTypeKeys<MAPPER>> =
    (process: Model.ProcessOf<MAPPER, Key>) => MaybePromise<Model.ProcessOf<MAPPER, Key>>;

export type OnEnterHook<MAPPER extends Model.ProcessMapper, Key extends Model.ProcessTypeKeys<MAPPER>> = 
    ProcessFunction<MAPPER, Key>;

export type OnCompleteHook<MAPPER extends Model.ProcessMapper, Key extends Model.ProcessTypeKeys<MAPPER>> =
    ProcessFunction<MAPPER, Key>;

export interface ProcessStep<MAPPER extends Model.ProcessMapper, Key extends Model.ProcessTypeKeys<MAPPER>> {
    readonly id: number;
    readonly name: string;
    readonly label: string;
    readonly component: Type<any>;
    readonly onEnter?: OnEnterHook<MAPPER, Key>;
    readonly onComplete?: OnCompleteHook<MAPPER, Key>;
}

export interface ProcessConfig<MAPPER extends Model.ProcessMapper = Model.ProcessMapper, Key extends Model.ProcessTypeKeys<MAPPER> = string> {
    readonly processType: Key;
    readonly processName: string;    
    readonly steps: ProcessStep<MAPPER, Key>[];
    readonly infos: ProcessInfo[];
}

export type ProcessConfigFactory<MAPPER extends Model.ProcessMapper, Key extends Model.ProcessTypeKeys<MAPPER>> = 
    () => ProcessConfig<MAPPER, Key>;

export type ConfigRegistry<MAPPER extends Model.ProcessMapper = Model.ProcessMapper> =
    <Key extends Model.ProcessTypeKeys<MAPPER>>(processType: Key) 
        => Promise<ProcessConfigFactory<MAPPER, Key>>;

export const REGISTRY_TOKEN = new InjectionToken<ConfigRegistry>('REGISTRY_TOKEN');