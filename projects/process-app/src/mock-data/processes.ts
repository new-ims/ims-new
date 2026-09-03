import { FakeModels } from '@fake-models';

export const MOCK_PROCESSES: FakeModels.FakeProcesses[number][] = [
  {
    processType: 'holiday',
    processKey: 'ho000001',
    vacationType: 'leisure',
    taskName: 'APPROVAL',
    stepName: 'approval',
  },
  {
    processType: 'holiday',
    processKey: 'ho000002',
    vacationType: 'adventure',
    taskName: 'APPROVAL',
    stepName: 'schedule',
  },
  {
    processType: 'holiday',
    processKey: 'ho000003',
    vacationType: 'cultural',
    taskName: 'APPROVAL',
    stepName: 'request',
  },
  {
    processType: 'radiant-health',
    processKey: 'rh000010',
    degreeOfHealth: 92,
    taskName: 'APPROVAL',
    stepName: 'request',
  },
  {
    processType: 'radiant-health',
    processKey: 'rh000002',
    degreeOfHealth: 76,
    taskName: 'APPROVAL',
    stepName: 'request',
  },
  {
    processType: 'radiant-health',
    processKey: 'rh000012',
    degreeOfHealth: 58,
    taskName: 'APPROVAL',
    stepName: 'tasks-synchronize',
  },
];
