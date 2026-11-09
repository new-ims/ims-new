import type { Model } from '@common/models';
export interface ProcessSlice<P extends Model.BaseProcess = Model.BaseProcess> {
    readonly process: P | null;
    readonly overrides: StepOverides;
    readonly selectedInfoId: string;
}

export function initialProcessSlice<P extends Model.BaseProcess>(): ProcessSlice<P> {
    return {
        process: null,
        overrides: null,
        selectedInfoId: ''
        };
}

export function isProcessClosedForEditing(processDisabled: boolean, taskName: Model.TaskName): boolean {
    return taskName === 'COMPLETED' || taskName === 'CANCELED' || processDisabled;
}

export type StepOverides = 'enable' | 'disable' | null;