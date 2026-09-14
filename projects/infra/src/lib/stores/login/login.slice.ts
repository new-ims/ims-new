import { Adapter } from "@common/adapter";

export interface LoginSlice {
    readonly userInfo: Adapter.UserInfo | null;
    readonly processDisabled: boolean;
    readonly isHistorical: boolean;
}

export const initialUserSlice: LoginSlice = {
    userInfo: null,
    processDisabled: false,
    isHistorical: false
};