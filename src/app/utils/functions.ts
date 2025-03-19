import { Identifiable } from '../types/identifiable';

/**
 * Удаляет элемент из массива `array` по его идентификатору `id`.
 *
 * @template T Тип элементов массива. Должен реализовывать `Identifiable`.
 * @param {T[]} array - Массив объектов, реализующих интерфейс `Identifiable`.
 * @param {T extends Identifiable<infer Id> ? Id : never} id - Идентификатор элемента, который нужно удалить.
 * @returns {void} Ничего не возвращает. Мутирует исходный массив.
 *
 * @example
 * const data: Item[] = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
 * removeItemById(data, 1);
 * console.log(data); // [{ id: 2, name: 'Item 2' }]
 */
export function removeItemById<T extends Identifiable<any>>(
  array: T[],
  id: T extends Identifiable<infer Id> ? Id : never
): void {
  const arrayItem = array.find((v) => v.id === id);
  const index = array.indexOf(arrayItem);
  array.splice(index, 1);
}

/**
 * Возвращает индекс элемента в массиве `array` по идентификатору `id`.
 *
 * @template T Тип элементов массива. Должен реализовывать `Identifiable`.
 * @param {T[]} array - Массив объектов, реализующих интерфейс `Identifiable`.
 * @param {T extends Identifiable<infer Id> ? Id : never} id - Идентификатор элемента, индекс которого нужно найти.
 * @returns {number} Индекс элемента в массиве.
 *
 * @example
 * const array: Item[] = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
 * const index = getItemIndexById(array, 1);
 * console.log(index); // 0
 */
export function getItemIndexById<T extends Identifiable<any>>(
  array: T[],
  id: T extends Identifiable<infer Id> ? Id : never
): number {
  const arrayItem = array.find((v) => v.id === id);

  return array.indexOf(arrayItem);
}
