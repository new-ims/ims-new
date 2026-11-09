import { FakeModels } from '@fake-models';
import { getLookup } from '@infra';
import { holidayConfig } from '../config';
import { Model } from '@common/models';

export async function onEnterHolidayStep(
  process: FakeModels.AnyHolidayProcess,
): Promise<FakeModels.AnyHolidayProcess> {
  const days = getLookup(holidayConfig, 'days')();
  console.log('Days:', days);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { ...process, isInThePast: false };
}

export async function onEnterHolidayStep2<
  MAPPER extends FakeModels.AnyHolidayProcess,
  Key extends FakeModels.AnyHolidayProcessKey,
>(process: Model.ProcessOf<MAPPER, Key>): Promise<Model.ProcessOf<MAPPER, Key>> {
  const days = getLookup(holidayConfig, 'days')();
  console.log('Days:', days);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { ...process, isInThePast: false };
}
