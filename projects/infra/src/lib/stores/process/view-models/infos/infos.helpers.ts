import { Model } from "@common/models";
import { ProcessInfosVm } from "./infos.vm";
import { ConfigVm } from "../../../config/config.vm";
import { Adapter } from "@common/adapter";

export function buildProcessInfosVm(
    process: Model.BaseProcess,
    config: ConfigVm, 
    userInfo: Adapter.UserInfo
): ProcessInfosVm {
    
}