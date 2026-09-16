import { fakes } from "../../../processes-models";

export const holidayConfig = fakes.config('holiday', () => ({
    processName: 'Holiday Process',
    verifyInsured: true,
    steps: [
        {
            name: 'REQUEST',
            label: 'טופס בקשה',
            overrideIsEnabled: process => [process.vacationType === 'business', 'vacation type must be business']
        },
        {
            name: 'SCHEDULE',
            label: 'לוח זמנים',
            overrideReadonly: (process) => [process.vacationType === 'leisure', 'vacation type must be leisure']
        },
        {
            name: 'TASKS-SYNCHRONIZE',
            label: 'סנכרון משימות',
            overrideReadonly: process => [process.vacationType === 'adventure', 'vacation type must be adventure']
        },
        {
            name: 'APPROVAL_AUTHORITY',
            label: 'אישור',
        }
    ],
    infos: [
        {
            id: 'INFO-1',
            label: 'מידע נוסף',
            overrideIsEnabled: (process) => [process.vacationType !== 'adventure', 'vacation type must not be cultural'],
            overrideIsVisible: (process) => [process.vacationType !== 'adventure', 'vacation type must not be cultural']
        },
        {
            id: 'INFO-2',
            label: 'מידע נוסף 2',
        }
    ],
    overrideIsEnabled: (process) => [!process.isInThePast, 'Process must not be in the past'],
    overrideReadonly: (process) => {
        if (!process.isInThePast) return [true, 'Process must not be in the past'];
        if (process.vacationType === 'cultural') return [true, 'Vacation type is cultural'];
        return [false, 'Process must not be in the past or vacation type must be cultural'];
    }
}));
