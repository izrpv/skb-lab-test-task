import { Task } from '../models/task';

export interface TasksChangeEvent {
  completedTasks?: Task[];
  uncompletedTasks?: Task[];
}
