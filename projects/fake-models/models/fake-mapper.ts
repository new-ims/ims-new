import { Model } from "@common/models";
import { AnyHolidayProcess } from "./holiday-process";
import { RadiantHealthProcess } from "./radiant-health-process";


export type FakeMapper = AnyHolidayProcess | RadiantHealthProcess;

export type FakeProcessKey = Model.ProcessTypeKeys<FakeMapper>;
