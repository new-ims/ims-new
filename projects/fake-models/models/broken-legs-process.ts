import type { BaseProcess } from '@common/models';

export interface BrokenLegsProcess extends BaseProcess<'broken-legs'> {
    readonly numberOfBrokenLegs: number;
}

