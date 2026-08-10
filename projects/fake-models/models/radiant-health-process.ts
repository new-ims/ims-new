import { Model } from '@common/models';

export interface RadiantHealthProcess extends Model.BaseProcess<'radiant-health'> {
    readonly degreeOfHealth: number;
}

