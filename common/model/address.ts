
export interface Address {
  readonly apartment: number;
  readonly homeSign: string;
  readonly entrance: string | null;
  readonly cellPhone: number;
  readonly cityId: number;
  readonly cityName: string;
  readonly streetId: string;
  readonly streetName: string;
  readonly faxNumber: number;
  readonly faxNumberString: string;
  readonly faxPrefix: number;
  readonly homeNumber: number;
  readonly phoneNumber: number;
  readonly phoneNumberString: string;
  readonly phonePrefix: number;
  readonly postOfficeBox: number;
  readonly workPhoneNumber: number;
  readonly workPhonePrefix: number;
  readonly zipCode: number;
  readonly approvedAddress: string;
  readonly approvedAddressCode: string;
  readonly noneExistingStreetNameFlag: boolean;
}
