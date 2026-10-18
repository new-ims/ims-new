import { Mutation, rxMutation } from "@angular-architects/ngrx-toolkit";
import { Injector } from "@angular/core";
import { MaybePromise } from "@common/utils";
import { from, of } from "rxjs";

export interface MutationOptions<Parameter, Result> {
    operation: (param: Parameter) => MaybePromise<Result>;
    onSuccess?: (result: Result, param: Parameter) => void;
    onError?: (error: unknown, param: Parameter) => void;
    injector?: Injector;
}


export function mutation<Result>(options: MutationOptions<void, Result>): Mutation<void, Result>;
export function mutation<Parameter, Result>(options: MutationOptions<Parameter, Result>): Mutation<Parameter, Result>;
export function mutation<Parameter, Result>(
    options: MutationOptions<Parameter, Result>,
) {
    return rxMutation({
        operation: (param: Parameter) => {
            const res = options.operation(param);
            const promise = (res instanceof Promise) ? res : Promise.resolve(res);
            return from(promise);
        },
        onSuccess: options.onSuccess,
        onError: options.onError,
        injector: options.injector,
    });
}