import { ProcessTypeKeys } from "@common/models";
import { BrokenLegsProcess } from "./broken-legs-process";
import { TornLigamentsProcess } from "./torn-ligaments-process";
import type { ExternalLoginOutput } from "@common/api";


export type Processes = [BrokenLegsProcess, TornLigamentsProcess];

export type ProcessTypeKey = ProcessTypeKeys<Processes>;
