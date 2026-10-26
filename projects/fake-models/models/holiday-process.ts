import  { Model } from '@common/models';


export interface HolidayClaim {
    readonly startDate: string;
    readonly endDate: string;
    readonly wasStarted: boolean;
}

export interface HolidayPolicy {
    readonly maxDays: number;
    readonly carryOverDays: number;
    readonly claims: HolidayClaim[];
}

export interface HolidayProcess extends Model.BaseProcess<'holiday'> {
    readonly vacationType: 'leisure' | 'adventure' | 'cultural' | 'business';
    readonly isInThePast: boolean;
    readonly wasEntered: boolean;
    readonly policies: HolidayPolicy[];
}