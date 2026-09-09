import { UserInfo } from "../../../../../common/adapter/_types";

export interface LoginSlice {
    readonly userInfo: UserInfo | null;
    readonly processDisabled: boolean;
}

export const initialUserSlice: LoginSlice = {
    userInfo: null,
    processDisabled: false
};