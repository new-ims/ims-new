import { Service } from "@angular/core";
import { FakeModels } from "@fake-models";

@Service()
export class FakeService {
    async getDays(process: FakeModels.AnyHolidayProcess) {
        console.log('fetching days...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        return [
            {day: 2, name: 'Monday'},
            {day: 3, name: 'Tuesday'},
            {day: 4, name: 'Wednesday'},
            {day: 5, name: 'Thursday'},
            {day: 6, name: 'Friday'},
            {day: 7, name: 'Saturday'},
            {day: 1, name: 'Sunday'}
        ];
    }

    async getPrimes(process: FakeModels.AnyHolidayProcess) {
        console.log('fetching primes...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        return [2, 3, 5, 7, 11, 13, 17];
    }

    async getCulturalActivities(process: FakeModels.AnyHolidayProcess) {
        console.log('fetching cultural activities...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        return ['Museum', 'Theater', 'Concert', 'Exhibition'];
    }
}
