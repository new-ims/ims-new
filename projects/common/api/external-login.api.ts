import type { ProcessMapper, ProcessTypeKeys } from "../models/core.types";

export interface ExternalLoginInput {
  readonly sessionManagerId: string;
}

export interface ExternalLoginOutput<MAPPER extends ProcessMapper> {
  readonly processType: ProcessTypeKeys<MAPPER>;
  readonly processKey: string;
}
