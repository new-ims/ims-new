import  { Model } from '@common/models';

export interface HolidayProcess extends Model.BaseProcess<'holiday'> {
    readonly vacationType: 'leisure' | 'adventure' | 'cultural';
}