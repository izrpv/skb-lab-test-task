import { Identifiable } from './identifiable';

export interface MatFormDialogData<T extends Identifiable> {
  entity?: T;
  readonly?: boolean;
}
