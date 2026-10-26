import { Service } from "@angular/core";

@Service()
export class FakeService {
    async getDays() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    }
}
