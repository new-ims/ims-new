import { Type } from "@angular/core";

export interface InfoVm {
    readonly id: string;
    readonly label: string;
    readonly component?: Type<any>;
    readonly isEnabled: boolean;
    readonly debugComments: Record<string, string>;
}

export interface ProcessInfosVm {
    readonly infos: InfoVm[];
}