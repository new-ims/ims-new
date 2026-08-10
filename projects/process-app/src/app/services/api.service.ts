import { Service } from "@angular/core";
import { ApiServiceBase } from "@infra";
import { FakeModels } from "@fake-models";
import { Api } from "@common/api";


@Service() 
export class ApiService implements ApiServiceBase<FakeModels.FakeProcesses> {
    async externalLogin(input: Api.ExternalLoginInput): Promise<Api.ExternalLoginOutput<FakeModels.FakeProcesses>> {
        console.log("ApiService.externalLogin called with input:", input);
        return {
            processKey: 'blablabla', 
            processType: 'holiday'
        }
    }
}