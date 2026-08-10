export interface BaseProcess {

}

export type ProcessMapper = Record<string, BaseProcess>;
export type ProcessTypeKeys<MAPPER extends ProcessMapper> = Extract<keyof MAPPER, string>;