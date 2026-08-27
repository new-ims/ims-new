import { ProcessConfig } from "../../services/configuration/config.model";

export interface ConfigSlice {
    readonly config: ProcessConfig | null;    
}

export const initialConfigSlice: ConfigSlice = {
    config: null
};