import { ProcessPredicate } from "@infra";

export const  isRemoteUser: ProcessPredicate = (_, login) => 
    [login.displayName.includes('רחוק'), 'User must be remote'];