export interface BaseProcess<T extends string = string> {
  readonly processType: T;
  readonly processKey: string;
  readonly stepName: string;
  readonly taskName: TaskName;
}

export type ProcessMapper = BaseProcess[];
export type ProcessTypeKeys<MAPPER extends ProcessMapper> = MAPPER[number]['processType'];

export type ProcessOf<MAPPER extends ProcessMapper, Key extends ProcessTypeKeys<MAPPER>> = Extract<
  MAPPER[number],
  { processType: Key }
>;

export type ProcessType<T extends BaseProcess = BaseProcess> = T['processType'];

export type Company = 'MIGDAL' | 'MAKEFET';

export type TaskName = 'APPROVAL' | 'COMPLETED' | 'CANCELED';