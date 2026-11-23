import { produce, Draft } from "immer";

export type Maybe<T> = T | null | undefined;


export type ArrayUpdater<T> = Partial<T> | ((item: T, index: number) => Partial<T>);
export type CertainArrayUpdater<T> = (item: T, index: number) => Partial<T>;

export type ObjectUpdater<T> = Partial<T> | ((item: T) => Partial<T>);
export type CertainObjectUpdater<T> = (item: T) => Partial<T>;


export type ArrayPredicate<T> = boolean | ((item: T, index: number) => boolean);
export type CertainArrayPredicate<T> = (item: T, index: number) => boolean;

export type ObjectPredicate<T> = boolean | ((item: T) => boolean);
export type CertainObjectPredicate<T> = (item: T) => boolean;


function effectiveArrayUpdater<T>(updater: Maybe<ArrayUpdater<T>>): CertainArrayUpdater<T> {
    if (!updater) {
        return () => ({});
    }
    if (typeof updater === "function") {
        return updater as (item: T, index: number) => Partial<T>;
    }
    return () => updater as Partial<T>;
}

function effectiveObjectUpdater<T>(updater: Maybe<ObjectUpdater<T>>): CertainObjectUpdater<T> {
    if (!updater) {
        return () => ({});
    }
    if (typeof updater === "function") {
        return updater as (item: T) => Partial<T>;
    }
    return () => updater as Partial<T>;
}

function effectiveArrayPredicate<T>(predicate: Maybe<ArrayPredicate<T>>): CertainArrayPredicate<T> {
    if (!predicate) {
        return () => true;
    }
    if (typeof predicate === "function") {
        return predicate as (item: T, index: number) => boolean;
    }
    return () => predicate as boolean;
}

function effectiveObjectPredicate<T>(predicate: Maybe<ObjectPredicate<T>>): CertainObjectPredicate<T> {
    if (!predicate) {
        return () => true;
    }
    if (typeof predicate === "function") {
        return predicate as (item: T) => boolean;
    }
    return () => predicate as boolean;
}


function applyArrayUpdater<T>(item: T, index: number, maybeUpdater: Maybe<ArrayUpdater<T>>): T {
    const updater = effectiveArrayUpdater(maybeUpdater);
    return { ...item, ...updater(item, index) };
}

function applyArrayPredicate<T>(item: T, index: number, maybePredicate: Maybe<ArrayPredicate<T>>): boolean {
    const predicate = effectiveArrayPredicate(maybePredicate);
    return predicate(item, index);
}

function applyObjectUpdater<T>(item: T, maybeUpdater: Maybe<ObjectUpdater<T>>): T {
    const updater = effectiveObjectUpdater(maybeUpdater);
    return { ...item, ...updater(item) };
}

function applyObjectPredicate<T>(item: T, maybePredicate: Maybe<ObjectPredicate<T>>): boolean {
    const predicate = effectiveObjectPredicate(maybePredicate);
    return predicate(item);
}


export function updateMany<T>(array: T[], maybeUpdater: Maybe<ArrayUpdater<T>>): T[] {
    return array.map((item, index) => applyArrayUpdater(item, index, maybeUpdater));
}

export function updateManyIf<T>(
    array: T[], predicate: Maybe<ArrayPredicate<T>>, 
    updater: Maybe<ArrayUpdater<T>>,
    elseUpdater?: Maybe<ArrayUpdater<T>>
): T[] {
    return array.map((item, index) => applyArrayPredicate(item, index, predicate)
        ? applyArrayUpdater(item, index, updater) 
        : (elseUpdater ? applyArrayUpdater(item, index, elseUpdater) : item));
}

export function updateAt<T>(array: T[], index: number, updater: Maybe<ArrayUpdater<T>>): T[] {
    return updateManyIf(array, (_, i) => i === index, updater);
}

export function reduceArray<T>(...updaters: Maybe<ArrayUpdater<T>>[]): CertainArrayUpdater<T> {
    return (item: T, index: number) => 
        updaters.reduce<T>((acc, updater) => applyArrayUpdater(acc, index, updater), item);
}

export function reduceObject<T>(...updaters: Maybe<ObjectUpdater<T>>[]): CertainObjectUpdater<T> {
    return (item: T) => 
        updaters.reduce<T>((acc, updater) => applyObjectUpdater(acc, updater), item);
}


export function mutate<T>(data: T, mutator: (item: Draft<T>) => void): T {
    return produce(data, mutator);
}

