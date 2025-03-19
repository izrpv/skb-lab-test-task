import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  @Input() task: Task;
  @Output() openItem = new EventEmitter<Task>();
  @Output() editItem = new EventEmitter<Task>();
  @Output() removeItem = new EventEmitter<Task>();
  @Output() toggleTaskStatus = new EventEmitter<Task>();

  taskStatusChange(task: Task, status: boolean): void {
    this.toggleTaskStatus.emit({ ...task, status });
  }

  getDeadlineColor(task: Task): string {
    const today = new Date();
    const deadlineDate = new Date(task.deadline);

    // Убираем время, чтобы сравнивать только даты
    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);

    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Просроченный дедлайн
    if (!task.status && daysDiff < 0) {
      return 'app-task-item_expired';
    }

    // Осталось 3 дня или меньше
    if (!task.status && daysDiff <= 3) {
      return 'app-task-item_pending';
    }

    return '';
  }
}
