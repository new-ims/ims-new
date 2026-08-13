import type { ProcessMapper, ProcessOf, ProcessTypeKeys } from "../models/core.types";

export interface GetProcessInput<MAPPER extends ProcessMapper> {
    readonly processType: ProcessTypeKeys<MAPPER>;
    readonly processKey: string;
}

export interface GetProcessOutput<MAPPER extends ProcessMapper> {
    readonly process: ProcessOf<MAPPER, ProcessTypeKeys<MAPPER>>;
}
