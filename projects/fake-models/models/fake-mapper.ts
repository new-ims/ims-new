import { Model } from "@common/models";
import { HolidayProcess } from "./holiday-process";
import { RadiantHealthProcess } from "./radiant-health-process";


export type FakeMapper = HolidayProcess | RadiantHealthProcess;

export type FakeProcessKey = Model.ProcessTypeKeys<FakeMapper>;
