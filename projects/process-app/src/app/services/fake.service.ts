import { Service } from "@angular/core";
import { HolidayProcess } from "../../../../fake-models/models/holiday-process";

@Service()
export class FakeService {
    async getDays(process: HolidayProcess) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    }

    async getPrimes(process: HolidayProcess) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return [2, 3, 5, 7, 11, 13, 17];
    }

    async getCulturalActivities(process: HolidayProcess) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return ['Museum', 'Theater', 'Concert', 'Exhibition'];
    }
}
