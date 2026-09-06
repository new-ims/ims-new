import type { ProcessMapper, ProcessTypeKeys } from "../models/core.types";
import type { UserInfo } from "./user-info.model";

export interface LoginInput {
  readonly params: Record<string, string>;
}

export interface LoginOutput<MAPPER extends ProcessMapper> {
  readonly processType: ProcessTypeKeys<MAPPER>;
  readonly processKey: string;
  readonly userInfo: UserInfo;
}
