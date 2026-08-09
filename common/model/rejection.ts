import { Model } from '../model';

export interface Rejection {
  readonly rejectionReason: string | null;
  readonly rejectionCode: Model.RejectionCode;
  readonly date: number | null;
}
