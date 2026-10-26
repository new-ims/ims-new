import { produce, Draft } from "immer";

export function updateMany<T>(array: T[], updater: (item: T, index: number) => Partial<T>): T[] {
    return array.map((item, index) => ({ ...item, ...updater(item, index) }));
}

export function updateManyIf<T>(array: T[], predicate: (item: T, index: number) => boolean, updater: (item: T, index: number) => Partial<T>): T[] {
    return array.map((item, index) => predicate(item, index) ? ({ ...item, ...updater(item, index) }) : item);
}

export function mutate<T>(data: T, mutator: (item: Draft<T>) => void): T {
    return produce(data, mutator);
}