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