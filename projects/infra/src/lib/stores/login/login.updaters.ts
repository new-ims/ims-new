import { Adapter } from "@common/adapter";
import { PartialStateUpdater } from "@ngrx/signals";
import { LoginSlice } from "./login.slice";

export function setUserInfo(userInfo: Adapter.UserInfo): PartialStateUpdater<LoginSlice> {
    return _ => ({
        userInfo
    })
}

export function setProcessDisabled(disabled: boolean): PartialStateUpdater<LoginSlice> {
    return _ => ({
        processDisabled: disabled
    })
}

export function setIsHistorical(isHistorical: boolean): PartialStateUpdater<LoginSlice> {
    return _ => ({
        isHistorical
    })
}

export function setLoginData(loginData: Adapter.LoginOutput): PartialStateUpdater<LoginSlice> {
    return _ => ({
        userInfo: loginData.userInfo,
        processDisabled: loginData.processDisabled
            ? loginData.processDisabled
            : false,
        isHistorical: loginData.isHistorical
            ? loginData.isHistorical
            : false
    })
}