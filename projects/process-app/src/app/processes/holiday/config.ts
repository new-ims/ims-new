import { fakes } from "../../../processes-models";

export const holidayConfig = fakes.config('holiday', () => ({
    processName: 'Holiday Process',
    steps: [
        {
            name: 'REQUEST',
            label: 'טופס בקשה', 
        }, 
        {
            name: 'SCHEDULE',
            label: 'לוח זמנים', 
        }, 
        {
            name: 'TASKS-SYNCHRONIZE', 
            label: 'סנכרון משימות',
        }, 
        {
            name: 'APPROVAL_AUTHORITY',
            label: 'אישור',
        }
    ], 
    infos: []
}));
