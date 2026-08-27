import { signalStore, withMethods, withState } from "@ngrx/signals";
import { initialProcessSlice } from "./process.slice";
import { updateState, withDevtools } from "@angular-architects/ngrx-toolkit";
import { Model } from "@common/models";

export const ProcessStore = signalStore(
    { providedIn: 'root' }, 
    withState(initialProcessSlice()), 
    withMethods(store => ({
        resetProcess: (process: Model.BaseProcess) => {
            updateState(store, 'Reset Process', { process })
        }
    })),
    withDevtools('ProcessStore')
)