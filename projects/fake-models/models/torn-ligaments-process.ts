import type { BaseProcess } from '@common/models';

export interface TornLigamentsProcess extends BaseProcess<'torn-ligaments'> {
    readonly ligamentType: 'ACL' | 'MCL' | 'PCL' | 'LCL';
}