import { fakes } from "../../../processes-models";

export const radiantHealthConfig = fakes.config('radiant-health', () => ({
    processName: 'Radiant Health Process',
    verifyInsured: false,
    steps: [],
    infos: []
}));