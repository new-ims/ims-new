import { fakes } from "../../../processes-models";

export const holidayConfig = fakes.config('holiday', () => ({
    processName: 'Holiday Process',
    steps: [
        {
            name: 'request',
            label: 'טופס בקשה', 
        }, 
        {
            name: 'schedule',
            label: 'לוח זמנים', 
        }, 
        {
            name: 'tasks-synchronize', 
            label: 'סנכרון משימות',
        }, 
        {
            name: 'approval',
            label: 'אישור',
        }
    ], 
    infos: []
}));
