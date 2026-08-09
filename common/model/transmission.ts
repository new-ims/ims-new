import { Mode } from './mode';
import { UntilStep } from './until-step';

export interface Transmission {
  readonly sourceCode: number;
  readonly sourceDescription: string;
  readonly transRefGUID: string;
  readonly mode: Mode;
  readonly untilStep: UntilStep;
  readonly referenceNumber: string;
  readonly waitingFlag: number;
}
