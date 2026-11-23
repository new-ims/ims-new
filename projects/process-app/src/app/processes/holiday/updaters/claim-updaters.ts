import { updateManyIf } from '@common/utils';
import { FakeModels } from '@fake-models';
import { PartialStateUpdater } from '@ngrx/signals';

export function setClaimStartEnd(maxDays: number, newStart: string, newEnd: string)
    : PartialStateUpdater<FakeModels.AnyHolidayProcess> {
    return process => ({
        policies: updateManyIf(process.policies, policy => policy.maxDays <= maxDays, policy => ({
            claims: updateManyIf(policy.claims, claim => claim.wasStarted, {
                startDate: newStart,
                endDate: newEnd
            })
        }))
    })
}


// now can be used like this inside signal store
// patchState(store, setClaimStartEnd(maxDays, newStart, newEnd))

// or if the process is only part of the state
// patchState(store, state => ({
//     process: setClaimStartEnd(maxDays, newStart, newEnd)(state.process)
// }))
