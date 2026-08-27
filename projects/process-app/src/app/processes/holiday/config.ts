import { fakes } from "../../../processes-models";

export const holidayConfig = fakes.config('holiday', () => ({
    processName: 'Holiday Process',
    steps: [
        {
            name: 'request',
            label: 'טופס בקשה', 
        }
    ], 
    infos: []
}));
