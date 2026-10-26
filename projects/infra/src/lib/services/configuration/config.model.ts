import { Model } from '@common/models';
import { InjectionToken, Type } from '@angular/core';
import { MaybePromise } from '@common/utils';
import { Adapter } from '@common/adapter';

//#region Callback Types
export type ProcessFunction<
  MAPPER extends Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER>,
  Result = void,
> = (process: Model.ProcessOf<MAPPER, Key>) => Result;

export type ProcessMaybeAsyncFunction<
  MAPPER extends Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER>,
  Result = void,
> = ProcessFunction<MAPPER, Key, MaybePromise<Result>>;

export type ProcessConverter<
  MAPPER extends Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER>,
> = ProcessMaybeAsyncFunction<MAPPER, Key, Model.ProcessOf<MAPPER, Key>>;

export type OnEnterResult<
  MAPPER extends Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER>,
> = Model.ProcessOf<MAPPER, Key>;

export type OnEnterHook<
  MAPPER extends Model.ProcessMapper = Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER> = string,
> = ProcessMaybeAsyncFunction<MAPPER, Key, OnEnterResult<MAPPER, Key>>;

export const CONTINUE_ACTIONS = [
  'NEXT',
  'HOME',
  'NEXT&HOME',
  'PREVIOUS&HOME',
  'STAY',
  'LETTERS',
] as const;
export type ContinueAction = (typeof CONTINUE_ACTIONS)[number];

export type OnCompleteResult = {
  continue: ContinueAction;
  nextStepName?: string;
  completionMessage?: string;
};

export type OnCompleteHook<
  MAPPER extends Model.ProcessMapper = Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER> = string,
> = ProcessMaybeAsyncFunction<MAPPER, Key, OnCompleteResult>;

export type CommentedPredicateResult = [boolean, string];
export type ProcessPredicate<
  MAPPER extends Model.ProcessMapper = Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER> = string,
> = (process: Model.ProcessOf<MAPPER, Key>, login: Adapter.UserInfo) => CommentedPredicateResult;

//#endregion Callback Types

//#region Info Tabs
export interface ProcessInfo<
  MAPPER extends Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER>,
> {
  readonly id: string;
  readonly label: string;
  readonly component?: Type<any>;
  readonly overrideIsEnabled?: ProcessPredicate<MAPPER, Key>;
  readonly overrideIsVisible?: ProcessPredicate<MAPPER, Key>;
}
//#endregion Info Tabs

//#region lookups
export type LookupConfig<MAPPER extends Model.ProcessMapper = Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER> = string, T = unknown> = {
    default: NoInfer<T>;
    getter: (process: Model.ProcessOf<MAPPER, Key>) => MaybePromise<T>;
}

export type LookupRegistry<MAPPER extends Model.ProcessMapper = Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER> = string,
  X extends Record<string, unknown> = Record<string, unknown>> = {
    [K in keyof X]: LookupConfig<MAPPER, Key, X[K]>;
}

export type RequiredLookups<Lookup extends Record<string, unknown> = Record<string, unknown>> 
  = ((keyof Lookup) | { key: keyof Lookup, timing: 'afterEnter' })[]

//#endregion lookups

export type ProcessStep<
  MAPPER extends Model.ProcessMapper = Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER> = string,
  Lookup extends Record<string, unknown> = Record<string, unknown>,
> = {
  readonly name: string;
  readonly label: string;
  readonly alwaysEnabled?: boolean;
  readonly component?: Type<any>;
  readonly overrideIsEnabled?: ProcessPredicate<MAPPER, Key>;
  readonly overrideReadonly?: ProcessPredicate<MAPPER, Key>;
  readonly onEnter?: OnEnterHook<MAPPER, Key>;
  readonly onComplete?: OnCompleteHook<MAPPER, Key>;
  readonly requiredLookups?: RequiredLookups<Lookup>;
} 

export interface ProcessConfig<
  MAPPER extends Model.ProcessMapper = Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER> = string,
  Lookup extends Record<string, unknown> = Record<string, unknown>,
> {
  readonly processType: Key;
  readonly processName: string;
  readonly steps: ProcessStep<MAPPER, Key, Lookup>[];
  readonly infos: ProcessInfo<MAPPER, Key>[];
  readonly verifyInsured: boolean;
  readonly overrideIsEnabled?: ProcessPredicate<MAPPER, Key>;
  readonly overrideReadonly?: ProcessPredicate<MAPPER, Key>;
  readonly onEnter?: OnEnterHook<MAPPER, Key>;
  readonly lookups?: LookupRegistry<MAPPER, Key, Lookup>;
}

export type ProcessConfigWithoutType<
  MAPPER extends Model.ProcessMapper = Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER> = string,
  Lookup extends Record<string, unknown> = Record<string, unknown>,
> = Omit<ProcessConfig<MAPPER, Key, Lookup>, 'processType'>;

export type ProcessConfigFactory<
  MAPPER extends Model.ProcessMapper,
  Key extends Model.ProcessTypeKeys<MAPPER>,
> = () => ProcessConfig<MAPPER, Key>;

// define ConfigRegistry as a mapping of processType to ProcessConfigFactory
export type ConfigRegistry<MAPPER extends Model.ProcessMapper = Model.ProcessMapper> = {
  [K in Model.ProcessTypeKeys<MAPPER>]: () => Promise<ProcessConfig<MAPPER, K>>;
};

export const CONFIG_REGISTRY_TOKEN = new InjectionToken<ConfigRegistry>('CONFIG_REGISTRY_TOKEN');
