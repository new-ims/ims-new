import { PartialStateUpdater } from "@ngrx/signals";
import { ProcessSlice } from "./process.slice";

export function selectInfo(infoId: string): PartialStateUpdater<ProcessSlice> {
    return _ => ({
        activeInfoId: infoId
    });
}