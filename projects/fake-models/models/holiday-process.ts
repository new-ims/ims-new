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

export interface HolidayProcessBase<T extends string> extends Model.BaseProcess<T> {
    readonly vacationType: 'leisure' | 'adventure' | 'cultural' | 'business';
    readonly isInThePast: boolean;
    readonly wasEntered: boolean;
    readonly policies: HolidayPolicy[];
}

export interface HolidayProcess extends HolidayProcessBase<'holiday'> {
    '@class': 'HolidayProcess'
}

export interface HolidayContProcess extends HolidayProcessBase<'holiday-cont'> {
    '@class': 'HolidayContProcess'
}

export type AnyHolidayProcess = HolidayProcess | HolidayContProcess;
export type AnyHolidayProcessKey = AnyHolidayProcess['processType'];
