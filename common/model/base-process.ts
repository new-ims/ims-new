import { Model } from '../model';
import { Module } from './module';
import { Company } from './company';
import { ProcessOpeningSource } from './process-opening-source';
import { TaskName } from './task-name';
// import { BaseSuperClaim } from './base-super-claim';

export interface BaseProcess {
  readonly '@class': string;
  readonly id: number;
  readonly model: any;
  readonly module: Module;
  readonly version: number;
  readonly priorityType: number;
  readonly completionDate: number;
  readonly processKey: string;
  readonly company: Company;
  readonly creationDate: number;
  readonly lastModify: Model.Modify;
  readonly status: number;
  readonly step: number;
  readonly stepName: string;
  readonly openingSource: ProcessOpeningSource;
  readonly taskName: TaskName;
  readonly taskId: string;
  readonly taskCreationDate: number;
  readonly taskIdPrevious: string;
  readonly taskNamePrevious: TaskName;
  readonly selectedTab: string;
  readonly requestDate: number;
  readonly agent: Agent; // extends Person
  readonly transmission: Model.Transmission;
  readonly digitalMessagesStatuList: Model.DigitalMessagesStatus[];
  readonly rejection: Model.Rejection;
  readonly insured: Model.Insured | null;

  
  readonly documentsPackage: DocumentsPackage;
  readonly creatorId: ScaledNumber;
  readonly clerkSerialNum: ScaledNumber;
  readonly clerkId: ScaledNumber;
  readonly messages: Model.Message[];
  readonly kycIncomeSourceRequired: boolean;
  readonly kycIndirect: boolean;
  readonly kycRequired: boolean;
  readonly isInsuredVerified: boolean;
  readonly isDocoumentArrived: boolean;
  readonly superClaim: BaseSuperClaim;
}
