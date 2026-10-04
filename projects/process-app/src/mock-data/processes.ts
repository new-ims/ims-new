import { FakeModels } from '@fake-models';

export const MOCK_PROCESSES: FakeModels.FakeProcesses[number][] = [
  {
    processType: 'holiday',
    processKey: 'ho000001',
    vacationType: 'leisure',
    taskName: 'CLERK',
    stepName: 'SCHEDULE',
    step: 1,
    selectedTab: 'SCHEDULE',
    insuredVerified: true,
    isInThePast: false,
  },
  {
    processType: 'holiday',
    processKey: 'ho000002',
    vacationType: 'adventure',
    taskName: 'CANCELED',
    stepName: 'APPROVAL_AUTHORITY',
    step: 2,
    selectedTab: 'APPROVAL_AUTHORITY',
    insuredVerified: false,
    isInThePast: true,
  },
  {
    processType: 'holiday',
    processKey: 'ho000003',
    vacationType: 'business',
    taskName: 'APPROVAL',
    stepName: 'APPROVAL_AUTHORITY',
    selectedTab: 'APPROVAL_AUTHORITY',
    step: 3,
    insuredVerified: false, 
    isInThePast: false,
  },
  {
    processType: 'radiant-health',
    processKey: 'rh000010',
    degreeOfHealth: 92,
    taskName: 'APPROVAL',
    stepName: 'request',
    step: 1,
    selectedTab: 'request',
    insuredVerified: false
  },
  {
    processType: 'radiant-health',
    processKey: 'rh000002',
    degreeOfHealth: 76,
    taskName: 'APPROVAL',
    stepName: 'request',
    step: 1,
    selectedTab: 'request',
    insuredVerified: false
  },
  {
    processType: 'radiant-health',
    processKey: 'rh000012',
    degreeOfHealth: 58,
    taskName: 'APPROVAL',
    stepName: 'tasks-synchronize',
    step: 1,
    selectedTab: 'tasks-synchronize',
    insuredVerified: false
  },
];
