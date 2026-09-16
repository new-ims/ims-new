import type { Model } from '@common/models';
export interface ProcessSlice<MAPPER extends Model.ProcessMapper = Model.ProcessMapper, 
                Key extends Model.ProcessTypeKeys<MAPPER> = string> {
    readonly process: Model.ProcessOf<MAPPER, Key> | null;
    readonly overrides: StepOverides;
    readonly activeInfoId: string | null;
}

export function initialProcessSlice<MAPPER extends Model.ProcessMapper,
                Key extends Model.ProcessTypeKeys<MAPPER>>(): ProcessSlice<MAPPER, Key> {
    return {
        process: null,
        overrides: null,
        activeInfoId: null
        };
}

export function isProcessClosedForEditing(processDisabled: boolean, taskName: Model.TaskName): boolean {
    return taskName === 'COMPLETED' || taskName === 'CANCELED' || processDisabled;
}

export type StepOverides = 'enable' | 'disable' | null;