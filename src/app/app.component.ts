import { Component } from '@angular/core';
import { Task } from './models/task';
import { completedTasks, uncompletedTasks } from './services/mock-data';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogFormComponent } from './task-dialog-form/task-dialog-form.component';
import { takeUntil } from 'rxjs/operators';
import { DestroyService } from './services/destroy.service';
import { getItemIndexById } from '@utils/functions';
import { MatFormDialogData } from './types/mat-form-dialog-data';
import { NotifyService } from './services/notify.service';
import { TasksChangeEvent } from './task-list/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DestroyService, NotifyService],
})
export class AppComponent {
  title = 'skb-lab-test-task';

  completedTasks: Task[] = completedTasks;
  uncompletedTasks: Task[] = uncompletedTasks;

  constructor(
    public dialog: MatDialog,
    public destroy$: DestroyService,
    private notifyService: NotifyService
  ) {}

  addTask(): void {
    const dialogRef = this.dialog.open(TaskDialogFormComponent, {
      width: '500px',
      autoFocus: false,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((newTask: Task) => {
        if (!newTask) {
          return;
        }

        const tasks = newTask.status ? this.completedTasks : this.uncompletedTasks;

        tasks.unshift(newTask);
        this.notifyService.success(`Задача "${newTask.title}" успешно добавлена!`);
      });
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogFormComponent, {
      width: '500px',
      data: {
        entity: task,
      },
      autoFocus: false,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((updatedTask: Task) => {
        if (!updatedTask) {
          return;
        }

        const from = task.status ? this.completedTasks : this.uncompletedTasks;
        const to = updatedTask.status ? this.completedTasks : this.uncompletedTasks;
        const itemIndex = getItemIndexById(from, updatedTask.id);

        this.notifyService.success(`Задача "${updatedTask.title}" успешно изменена!`);

        // Если после изменения задачи статус изменился, то перемещаем элемент
        if (from !== to) {
          from.splice(itemIndex, 1);
          to.unshift(updatedTask);
          return;
        }

        from[itemIndex] = updatedTask;
      });
  }

  open(task: Task): void {
    const dialogRef = this.dialog.open<TaskDialogFormComponent, MatFormDialogData<Task>>(
      TaskDialogFormComponent,
      {
        width: '500px',
        data: {
          entity: task,
          readonly: true,
        },
        autoFocus: false,
      }
    );

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe();
  }

  itemsChanged({ completedTasks, uncompletedTasks }: TasksChangeEvent): void {
    if (completedTasks) {
      this.completedTasks = completedTasks;
    }

    if (uncompletedTasks) {
      this.uncompletedTasks = uncompletedTasks;
    }
  }
}
