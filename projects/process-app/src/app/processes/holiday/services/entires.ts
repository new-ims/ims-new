import { FakeModels } from '@fake-models';
import { getLookup } from '@infra';
import { holidayConfig } from '../config';
import { MOCK_PROCESSES } from '../../../../mock-data/processes';

export async function onEnterHolidayStep(
  process: FakeModels.AnyHolidayProcess,
): Promise<FakeModels.AnyHolidayProcess> {
  const days = getLookup(holidayConfig, 'days')();
  console.log('Days:', days);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { ...process, isInThePast: false };
}

export async function onEnterHolidayStep2<P extends FakeModels.AnyHolidayProcess>(process: P): Promise<P> {
  const days = getLookup(holidayConfig, 'days')();
  console.log('Days:', days);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { ...process, isInThePast: false };
}

const x = onEnterHolidayStep2(MOCK_PROCESSES[0] as FakeModels.HolidayProcess);
