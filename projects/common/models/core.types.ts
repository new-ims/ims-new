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

export const COMPANIES = ['MIGDAL', 'MAKEFET'] as const;
export type Company = typeof COMPANIES[number];

export const TASK_NAMES = ['APPROVAL', 'COMPLETED', 'CANCELED', 'CLERK'] as const;
export type TaskName = typeof TASK_NAMES[number];

export const KNOWN_TAB_NAMES = ['APPROVAL_AUTHORITY'] as const;
export type KnownTabName = typeof KNOWN_TAB_NAMES[number];
  