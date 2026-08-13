import { Service } from "@angular/core";
import { ApiServiceBase } from "@infra";
import { FakeModels } from "@fake-models";
import { Api } from "@common/api";


@Service() 
export class ApiService implements ApiServiceBase<FakeModels.FakeProcesses> {
    async login(input: Api.LoginInput): Promise<Api.LoginOutput<FakeModels.FakeProcesses>> {
        console.log("ApiService.externalLogin called with input:", input);
        return {
            processKey: '501275', 
            processType: 'holiday'
        }
    }
}