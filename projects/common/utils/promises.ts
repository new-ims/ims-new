export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export type MaybePromise<T> = T | Promise<T>;
export type MaybePromiseVoid = void | Promise<void>;

export async function resultOfMaybePromise<T>(maybePromise: MaybePromise<T>): Promise<T> {
    if (maybePromise instanceof Promise) {
        return await maybePromise;
    } else {
        return maybePromise;
    }
}

export async function resultOfMaybePromiseVoid(maybePromise: MaybePromiseVoid): Promise<void> {
    if (maybePromise instanceof Promise) {
        await maybePromise;
    } else {
        return;
    }
}