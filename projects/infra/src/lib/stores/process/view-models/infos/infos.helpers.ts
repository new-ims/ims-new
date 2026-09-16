import { Model } from "@common/models";
import { InfoVm, ProcessInfosVm } from "./infos.vm";
import { ConfigInfoTabVm, ConfigVm } from "../../../config/config.vm";
import { Adapter } from "@common/adapter";
import { CommentedPredicateResult } from "../../../../services/configuration/config.model";

export function buildProcessInfosVm(
    process: Model.BaseProcess,
    config: ConfigVm, 
    userInfo: Adapter.UserInfo
): ProcessInfosVm {
    const infosVm = config
    .infoTabs
    .map((infoTab) => buildInfoVm(infoTab))
    .filter((infoVm) => infoVm !== null) as InfoVm[];

    return {
        infos: infosVm
    };
    
    function buildInfoVm(infoTab: ConfigInfoTabVm): InfoVm | null {
         const [isVisibleResult, isVisibleComment] = isVisible();

        if (!isVisibleResult) {
        return null;
        }

        const [isEnabledResult, isEnabledComment] = isEnabled();

        function isVisible(): CommentedPredicateResult {
            if (infoTab.overrideIsVisible !== null) {
                const [result, comment] = infoTab.overrideIsVisible(process, userInfo);
                return [result, "info tab override: " + comment];
            }
            return [true, ""];
        }

        function isEnabled(): CommentedPredicateResult {
            if (infoTab.overrideIsEnabled !== null) {
                const [result, comment] = infoTab.overrideIsEnabled(process, userInfo);
                return [result, "info tab override: " + comment];
            }
            return [true, ""];
        }

        return {
            id: infoTab.id,
            label: infoTab.label,
            component: infoTab.component,
            isEnabled: isEnabledResult,
            debugComments: {
                isVisible: isVisibleComment,
                isEnabled: isEnabledComment
            }
        };

    }
}