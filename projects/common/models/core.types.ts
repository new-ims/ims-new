export interface BaseProcess<T extends string = string> {
  readonly processType: T;
  readonly processKey: string;
  readonly stepName: string;
  readonly selectedTab: string;
  readonly step: number;
  readonly taskName: TaskName;
  readonly insuredVerified: boolean; 
  readonly module: Module; 
  readonly company: Company;
  readonly insured: Insured;
}

export type ProcessMapper = BaseProcess;
export type ProcessTypeKeys<MAPPER extends ProcessMapper> = MAPPER['processType'];

export type ProcessOf<MAPPER extends ProcessMapper, Key extends ProcessTypeKeys<MAPPER>> =
  Extract<MAPPER, { readonly processType: Key }>;

export type ProcessType<T extends BaseProcess = BaseProcess> = T['processType'];

export const COMPANIES = ['MIGDAL', 'MAKEFET'] as const;
export type Company = typeof COMPANIES[number];

export const TASK_NAMES = ['APPROVAL', 'COMPLETED', 'CANCELED', 'CLERK'] as const;
export type TaskName = typeof TASK_NAMES[number];

export const KNOWN_TAB_NAMES = ['APPROVAL_AUTHORITY', 'DOCTOR_DECISION'] as const;
export type KnownTabName = typeof KNOWN_TAB_NAMES[number];


export const MODULES = ['TOOLS', 'PENSION_CLAIMS', 'HEALTH_CLAIMS', 'LIFE_CLAIMS', 'LOANS', 'CLAIMS', 'BROADCAST', 'POWER_ATTORNEY', 'APARTMENT_CLAIMS'] as const;
export type Module = typeof MODULES[number];

export interface Insured {
  readonly identity: number;
}