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
    wasEntered: false, 
    policies: [
      {
        maxDays: 20,
        carryOverDays: 5,
        claims: [
          {
            startDate: '2024-06-01',
            endDate: '2024-06-10',
            wasStarted: true
          }, 
          {
            startDate: '2024-07-01',
            endDate: '2024-07-05',
            wasStarted: false
          },
          {
            startDate: '2024-08-12',
            endDate: '2024-08-16',
            wasStarted: false
          }
        ]
      },
      {
        maxDays: 25,
        carryOverDays: 7,
        claims: [
          {
            startDate: '2024-01-14',
            endDate: '2024-01-18',
            wasStarted: true
          },
          {
            startDate: '2024-04-21',
            endDate: '2024-04-25',
            wasStarted: true
          },
          {
            startDate: '2024-09-08',
            endDate: '2024-09-12',
            wasStarted: false
          }
        ]
      },
      {
        maxDays: 18,
        carryOverDays: 4,
        claims: [
          {
            startDate: '2024-02-05',
            endDate: '2024-02-07',
            wasStarted: true
          },
          {
            startDate: '2024-05-19',
            endDate: '2024-05-23',
            wasStarted: true
          },
          {
            startDate: '2024-11-03',
            endDate: '2024-11-08',
            wasStarted: false
          }
        ]
      }
    ]
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
    wasEntered: false,
    policies: [
      {
        maxDays: 15,
        carryOverDays: 3,
        claims: [
          {
            startDate: '2024-03-10',
            endDate: '2024-03-14',
            wasStarted: true
          }
        ]
      }
    ]
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
    wasEntered: false,
    policies: [
      {
        maxDays: 25,
        carryOverDays: 7,
        claims: [
          {
            startDate: '2024-09-15',
            endDate: '2024-09-20',
            wasStarted: false
          },
          {
            startDate: '2024-12-01',
            endDate: '2024-12-03',
            wasStarted: false
          }
        ]
      }
    ]
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
