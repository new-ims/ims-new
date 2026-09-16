import { fakes } from "../../../processes-models";

export const holidayConfig = fakes.config('holiday', () => ({
    processName: 'Holiday Process',
    verifyInsured: true,
    steps: [
        {
            name: 'REQUEST',
            label: 'טופס בקשה', 
            overrideIsEnabled: process => process.vacationType === 'business'
        }, 
        {
            name: 'SCHEDULE',
            label: 'לוח זמנים', 
            overrideReadonly: process => process.vacationType === 'leisure'
        }, 
        {
            name: 'TASKS-SYNCHRONIZE', 
            label: 'סנכרון משימות',
            overrideReadonly: process => process.vacationType === 'adventure'
        }, 
        {
            name: 'APPROVAL_AUTHORITY',
            label: 'אישור',
        }
    ], 
    infos: [], 
    overrideIsEnabled: (process) => !process.isInThePast,
    overrideReadonly: (process) => !process.isInThePast 
        || process.vacationType === 'cultural'
}));
