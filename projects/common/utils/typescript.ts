/** Narrows a wide `string` to the literal type of `t`. Pair with `satisfies` to bind the check to a union. */
export const isUnion = <T extends string>(str: string, t: T): str is T => str === t;

export type Override<TBase, TPatch extends object> = Omit<TBase, keyof TPatch> & TPatch;

/*
    Example usage:
    interface Base {
        a: string;
        b: any[];
    }

    type Result = Override<Base, { b: string[] }>;
    // Result is equivalent to:
    // {
    //     a: string;
    //     b: string[];
    // }
    
*/