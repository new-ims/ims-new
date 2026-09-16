import { PartialStateUpdater } from "@ngrx/signals";
import { ProcessSlice } from "./process.slice";
import { InfoVm } from "./view-models/infos/infos.vm";

export function selectInfo(infoId: string): PartialStateUpdater<ProcessSlice> {
    return _ => ({
        activeInfoId: infoId
    });
}