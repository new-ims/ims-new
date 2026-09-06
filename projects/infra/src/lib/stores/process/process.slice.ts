import type { Model } from '@common/models';
export interface ProcessSlice<MAPPER extends Model.ProcessMapper, 
                Key extends Model.ProcessTypeKeys<MAPPER>> {
    readonly process: Model.ProcessOf<MAPPER, Key> | null;
    readonly overrides: StepOverides;
}

export function initialProcessSlice<MAPPER extends Model.ProcessMapper,
                Key extends Model.ProcessTypeKeys<MAPPER>>(): ProcessSlice<MAPPER, Key> {
    return {
        process: null,
        overrides: null
    };
}

export type StepOverides = 'enable' | 'disable' | null;