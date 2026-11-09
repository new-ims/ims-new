import { Model } from '@common/models';
import { InjectionToken, Type } from '@angular/core';
import { MaybePromise } from '@common/utils';
import { Adapter } from '@common/adapter';

//#region Callback Types
// `P` is the process type a config applies to: a single process or a union of processes.
export type ProcessFunction<P extends Model.BaseProcess, Result = void> = (process: P) => Result;

export type ProcessMaybeAsyncFunction<P extends Model.BaseProcess, Result = void> = ProcessFunction<
  P,
  MaybePromise<Result>
>;

export type ProcessConverter<P extends Model.BaseProcess> = ProcessMaybeAsyncFunction<P, P>;

export type OnEnterResult<P extends Model.BaseProcess> = P;

export type OnEnterHook<P extends Model.BaseProcess = Model.BaseProcess> =
  ProcessMaybeAsyncFunction<P, OnEnterResult<P>>;

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

export type OnCompleteHook<P extends Model.BaseProcess = Model.BaseProcess> =
  ProcessMaybeAsyncFunction<P, OnCompleteResult>;

export type CommentedPredicateResult = [boolean, string];
export type ProcessPredicate<P extends Model.BaseProcess = Model.BaseProcess> = (
  process: P,
  login: Adapter.UserInfo,
) => CommentedPredicateResult;

//#endregion Callback Types

//#region Info Tabs
export interface ProcessInfo<P extends Model.BaseProcess = Model.BaseProcess> {
  readonly id: string;
  readonly label: string;
  readonly component?: Type<any>;
  readonly overrideIsEnabled?: ProcessPredicate<P>;
  readonly overrideIsVisible?: ProcessPredicate<P>;
}
//#endregion Info Tabs

//#region lookups
export type LookupConfig<P extends Model.BaseProcess = Model.BaseProcess, T = unknown> = {
  default: NoInfer<T>;
  getter: (process: P) => MaybePromise<T>;
};

export type LookupRegistry<
  P extends Model.BaseProcess = Model.BaseProcess,
  X extends Record<string, unknown> = Record<string, unknown>,
> = {
  [K in keyof X]: LookupConfig<P, X[K]>;
};

export type RequiredLookups<Keys extends string = string> = (
  Keys | { key: Keys; timing: 'afterEnter' }
)[];

//#endregion lookups

export type ProcessStep<
  P extends Model.BaseProcess = Model.BaseProcess,
  LookupKeys extends string = string,
> = {
  readonly name: string;
  readonly label: string;
  readonly alwaysEnabled?: boolean;
  readonly component?: Type<any>;
  readonly overrideIsEnabled?: ProcessPredicate<P>;
  readonly overrideReadonly?: ProcessPredicate<P>;
  readonly onEnter?: OnEnterHook<P>;
  readonly onComplete?: OnCompleteHook<P>;
  readonly requiredLookups?: RequiredLookups<LookupKeys>;
};

export interface ProcessConfig<
  P extends Model.BaseProcess = Model.BaseProcess,
  Lookup extends Record<string, unknown> = Record<string, unknown>,
> {
  readonly processType: Model.ProcessType<P>;
  readonly processName: string;
  readonly steps: ProcessStep<P, Extract<keyof Lookup, string>>[];
  readonly infos: ProcessInfo<P>[];
  readonly verifyInsured: boolean;
  readonly overrideIsEnabled?: ProcessPredicate<P>;
  readonly overrideReadonly?: ProcessPredicate<P>;
  readonly onEnter?: OnEnterHook<P>;
  readonly lookups?: LookupRegistry<P, Lookup>;
}

export type ProcessConfigWithoutType<
  P extends Model.BaseProcess = Model.BaseProcess,
  Lookup extends Record<string, unknown> = Record<string, unknown>,
> = Omit<ProcessConfig<P, Lookup>, 'processType'>;

export type ProcessConfigFactory<P extends Model.BaseProcess> = () => ProcessConfig<P>;

// Maps each process type key of the mapper to a lazy loader of that process's config.
export type ConfigRegistry<MAPPER extends Model.ProcessMapper = Model.ProcessMapper> = {
  [K in Model.ProcessTypeKeys<MAPPER>]: () => Promise<ProcessConfig<Model.ProcessOf<MAPPER, K>>>;
};

export const CONFIG_REGISTRY_TOKEN = new InjectionToken<ConfigRegistry>('CONFIG_REGISTRY_TOKEN');
