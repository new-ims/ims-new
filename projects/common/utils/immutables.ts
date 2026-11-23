import { produce, Draft } from "immer";

export type Updater<T> = Partial<T> | ((item: T, index: number) => Partial<T>);

export type MaybeUpdater<T> = Updater<T> | null | undefined;

export type EffectiveUpdater<T> = (item: T, index: number) => Partial<T>;

export type Predicate<T> = boolean | ((item: T, index: number) => boolean);
export type MaybePredicate<T> = Predicate<T> | null | undefined;
export type EffectivePredicate<T> = (item: T, index: number) => boolean;

function effectiveUpdater<T>(updater: MaybeUpdater<T>): EffectiveUpdater<T> {
    if (!updater) {
        return () => ({});
    }
    if (typeof updater === "function") {
        return updater as (item: T, index: number) => Partial<T>;
    }
    return () => updater as Partial<T>;
}

function effectivePredicate<T>(predicate: MaybePredicate<T>): EffectivePredicate<T> {
    if (!predicate) {
        return () => true;
    }
    if (typeof predicate === "function") {
        return predicate as (item: T, index: number) => boolean;
    }
    return () => predicate as boolean;
}

function applyUpdater<T>(item: T, index: number, maybeUpdater: MaybeUpdater<T>): T {
    const updater = effectiveUpdater(maybeUpdater);
    return { ...item, ...updater(item, index) };
}

function applyPredicate<T>(item: T, index: number, maybePredicate: MaybePredicate<T>): boolean {
    const predicate = effectivePredicate(maybePredicate);
    return predicate(item, index);
}


export function updateMany<T>(array: T[], maybeUpdater: MaybeUpdater<T>): T[] {
    return array.map((item, index) => applyUpdater(item, index, maybeUpdater));
}

export function updateManyIf<T>(
    array: T[], predicate: MaybePredicate<T>, 
    updater: MaybeUpdater<T>,
    elseUpdater?: MaybeUpdater<T>
): T[] {
    return array.map((item, index) => applyPredicate(item, index, predicate)
        ? applyUpdater(item, index, updater) 
        : (elseUpdater ? applyUpdater(item, index, elseUpdater) : item));
}

export function updateAt<T>(array: T[], index: number, updater: MaybeUpdater<T>): T[] {
    return updateManyIf(array, (_, i) => i === index, updater);
}

export function reduce<T>(...updaters: MaybeUpdater<T>[]): EffectiveUpdater<T> {
    return (item: T, index: number) => 
        updaters.reduce<T>((acc, updater) => applyUpdater(acc, index, updater), item);
}

export function mutate<T>(data: T, mutator: (item: Draft<T>) => void): T {
    return produce(data, mutator);
}

