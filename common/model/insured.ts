import {Model} from './model.types';
import {IdentityType} from './identity-type';

export interface Insured {
  readonly updateTime: number;
  readonly companyEmployer: boolean;
  readonly identity: number;
  readonly identityType: IdentityType;
  readonly identityTypeDescription: string;
  readonly familyHeadIdentity: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly foreignName: string;
  readonly birthDate: number;
  readonly calculatedBirthDate: number;
  readonly deathDate: number;
  readonly gender: Model.Gender;
  readonly genderDescription: string;
  readonly professionCode: number;
  readonly professionDescription: string;
  readonly lastJobCode: number;
  readonly lastJobDescription: string;
  readonly jobCode: number;
  readonly jobDescription: string;
  readonly smokingCode: number;
  readonly smokingCodeString: string;  
  readonly familyStatus: string;
  readonly familyStatusCode: string;
  readonly medicalSupplementPercentage: number;
  readonly email: string;
  readonly email2: string;
  readonly electronicMailingCode: boolean;
  readonly electronicMailingCodeDescription: string;
  readonly address: Model.Address;
  readonly fatcaInfo: Model.FATCAInfo;
  readonly selfEmployedCode: number;
  readonly selfEmployedCodeDate: number;
  readonly statusCode: number;
  readonly statusDescription: string;
  readonly statusDate: number;
  readonly ageProof: string;
  readonly fatherName: string;
  readonly title: string;
  readonly healthMaintenanceOrganizationCode: number;
  readonly healthMaintenanceOrganizationDescription: string;
  readonly previousLastName: string;
  

  readonly company: string;
  readonly digitalConnectionAgreement: number;
  readonly isGovBirthDateMissing: boolean;
  readonly joseCitizen: number;
  readonly missing: boolean;
  readonly position: CodeValue | null;
  readonly sendingMarketingEmail: number;
  readonly sendingMarketingMail: number;
  readonly seniorCitizen: boolean;
}
