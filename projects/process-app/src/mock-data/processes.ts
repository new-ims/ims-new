import { FakeModels } from '@fake-models';

export const MOCK_PROCESSES: FakeModels.FakeProcesses[number][] = [
  {
    processType: 'holiday',
    processKey: 'ho000001',
    vacationType: 'leisure',
  },
  {
    processType: 'holiday',
    processKey: 'ho000002',
    vacationType: 'adventure',
  },
  {
    processType: 'holiday',
    processKey: 'ho000003',
    vacationType: 'cultural',
  },
  {
    processType: 'radiant-health',
    processKey: 'rh000010',
    degreeOfHealth: 92,
  },
  {
    processType: 'radiant-health',
    processKey: 'rh000002',
    degreeOfHealth: 76,
  },
  {
    processType: 'radiant-health',
    processKey: 'rh000012',
    degreeOfHealth: 58,
  },
];
