import { Identifiable } from '../types/identifiable';

/**
 * Задача
 */
export interface Task extends Identifiable {
  // Статус задачи
  status: boolean;

  // Заголовок
  title: string;

  // Срок выполнения
  deadline: Date;

  // Описание
  description?: string;
}
