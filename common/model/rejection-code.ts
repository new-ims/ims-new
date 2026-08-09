
export interface RejectionCode {
  readonly description: string | null;
  readonly code: number | null;
  readonly type: number | null;
  readonly isTor: boolean | null;
}
