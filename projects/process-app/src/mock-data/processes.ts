import { FakeModels } from '@fake-models';

export const MOCK_PROCESSES: FakeModels.FakeProcesses[number][] = [
  {
    processType: 'holiday',
    processKey: 'ho000001',
    vacationType: 'leisure',
    taskName: 'CLERK',
    stepName: 'SCHEDULE',
    insuredVerified: true,
  },
  {
    processType: 'holiday',
    processKey: 'ho000002',
    vacationType: 'adventure',
    taskName: 'CANCELED',
    stepName: 'SCHEDULE',
    insuredVerified: false,
  },
  {
    processType: 'holiday',
    processKey: 'ho000003',
    vacationType: 'cultural',
    taskName: 'APPROVAL',
    stepName: 'APPROVAL_AUTHORITY',
    insuredVerified: false
  },
  {
    processType: 'radiant-health',
    processKey: 'rh000010',
    degreeOfHealth: 92,
    taskName: 'APPROVAL',
    stepName: 'request',
    insuredVerified: false
  },
  {
    processType: 'radiant-health',
    processKey: 'rh000002',
    degreeOfHealth: 76,
    taskName: 'APPROVAL',
    stepName: 'request',
    insuredVerified: false
  },
  {
    processType: 'radiant-health',
    processKey: 'rh000012',
    degreeOfHealth: 58,
    taskName: 'APPROVAL',
    stepName: 'tasks-synchronize',
    insuredVerified: false
  },
];
