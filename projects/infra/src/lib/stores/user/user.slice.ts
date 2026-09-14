import { Adapter } from "@common/adapter";

export interface UserSlice {
    readonly userInfo: Adapter.UserInfo | null;
}

export const initialUserSlice: UserSlice = {
    userInfo: null
};