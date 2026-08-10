import type { ProcessMapper, ProcessTypeKeys } from "../models/core.types";

export interface ExternalLoginInput {
  readonly sessionManagerId: string;
}

export interface ExternalLoginOutput<MAPPER extends ProcessMapper, Key extends ProcessTypeKeys<MAPPER>> {
  readonly processType: Key;
  readonly processKey: string;
}
