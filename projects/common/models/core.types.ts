export interface BaseProcess<T extends string = string> {
    readonly processType: T;
}

export type ProcessMapper = BaseProcess[];
export type ProcessTypeKeys<MAPPER extends ProcessMapper> = MAPPER[number]['processType'];

export type ProcessOf<MAPPER extends ProcessMapper, Key extends ProcessTypeKeys<MAPPER>> = Extract<MAPPER[number], { processType: Key }>;

export type ProcessType<T extends BaseProcess> = T['processType'];