import { Service } from "@angular/core";
import { ApiServiceBase } from "@infra";
import { FakeModels } from "@fake-models";
import { Api } from "@common/api";
import { delay } from "@common/utils";


@Service() 
export class ApiService implements ApiServiceBase<FakeModels.FakeProcesses> {
    async login(input: Api.LoginInput): Promise<Api.LoginOutput<FakeModels.FakeProcesses>> {
        await delay(1000); // Simulate network delay
        console.log("ApiService.externalLogin called with input:", input.params);
        return {
            processKey: '501275', 
            processType: 'holiday'
        }
    }
}