import { Model } from "@common/models";
import { HolidayProcess } from "./holiday-process";
import { RadiantHealthProcess } from "./radiant-health-process";


export type FakeProcesses = [HolidayProcess, RadiantHealthProcess];

export type FakeProcessTypeKey = Model.ProcessTypeKeys<FakeProcesses>;
