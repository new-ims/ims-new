import { UserInfo } from "../../../../../common/adapter/_types";

export interface UserSlice {
    readonly userInfo: UserInfo | null;
}

export const initialUserSlice: UserSlice = {
    userInfo: null
};