/*
 * Идентифицируемый объект.
 * От него должны наследоваться все модели, которые имеют поле id
 */
export interface Identifiable<T extends number | string = number> {
  id: T;
}
