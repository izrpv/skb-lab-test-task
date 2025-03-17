import { Identifiable } from "../types/identifiable";

/**
 * Удаляет элемент из массива по его идентификатору.
 *
 * @param {Identifiable[]} data - Массив объектов, реализующих интерфейс Identifiable.
 * @param {Identifiable} item - Элемент, который нужно удалить из массива.
 * @returns {void} Ничего не возвращает.
 *
 * @example
 * const data = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
 * const item = { id: 1, name: 'Item 1' };
 * removeItemById(data, item);
 * console.log(data); // [{ id: 2, name: 'Item 2' }]
 */
export function removeItemById(data: Identifiable[], item: Identifiable): void {
    const arrayItem = data.find(v => v.id === item.id);
    const index = data.indexOf(arrayItem);
    data.splice(index, 1);
}

/**
 * Возвращает индекс элемента в массиве по его идентификатору.
 *
 * @param {Identifiable[]} array - Массив объектов, реализующих интерфейс Identifiable.
 * @param {Identifiable} item - Элемент, индекс которого нужно найти.
 * @returns {number} Индекс элемента в массиве. Если элемент не найден, возвращает -1.
 *
 * @example
 * const array = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
 * const item = { id: 1, name: 'Item 1' };
 * const index = getItemIndexById(array, item);
 * console.log(index); // 0
 */
export function getItemIndexById(array: Identifiable[], item: Identifiable): number {
    const arrayItem = array.find(v => v.id === item.id);

    return array.indexOf(arrayItem);
}