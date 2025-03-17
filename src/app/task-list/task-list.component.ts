import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Task } from '../models/task';
import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { removeItemById } from '@utils/functions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { DestroyService } from '../services/destroy.service';
import { MatConfirmDialogData } from '../types/mat-confirm-dialog-data';
import { NotifyService } from '../services/notify.service';
import { TasksChangeEvent } from './types';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [DestroyService, NotifyService],
})
export class TaskListComponent implements AfterViewInit {
  @Input() linkedTaskList: TaskListComponent;
  @Input() tasks: Task[];

  @ViewChild(CdkDropList) dropListRef: CdkDropList;

  @Output() editItem = new EventEmitter<Task>();
  @Output() openItem = new EventEmitter<Task>();

  // Т.к. обращаться к элементам tasks - не лучшая практика, то используем эмиттер,
  // где родительский компонент будет сам отвечать за обновление задач
  @Output() itemsChange = new EventEmitter<TasksChangeEvent>();

  dropList: CdkDropList;

  constructor(
    protected dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private destroy$: DestroyService,
    private notifyService: NotifyService
  ) {}

  // Используем именно AfterViewInit, т.к. в сеттере инпута linkedTaskList шаблон ещё не успел прогрузиться
  ngAfterViewInit(): void {
    if (this.linkedTaskList) {
      this.dropList = this.linkedTaskList?.dropListRef;
      this.cd.detectChanges();
    }
  }

  drop(event: CdkDragDrop<Task[]>): void {
    const { previousContainer, container, previousIndex, currentIndex } = event;
    const containerData = [...container.data];
    const previousContainerData = [...previousContainer.data];

    if (previousContainer === container) {
      const tasks = previousContainerData[previousIndex].status
        ? 'completedTasks'
        : 'uncompletedTasks';

      moveItemInArray(containerData, previousIndex, currentIndex);
      this.itemsChange.emit({ [tasks]: containerData });

      return;
    }

    const previousItem = previousContainerData[previousIndex];

    previousItem.status = !previousItem.status;
    transferArrayItem(previousContainerData, containerData, previousIndex, currentIndex);

    const completedTasks = previousItem.status ? containerData : previousContainerData;
    const uncompletedTasks = previousItem.status ? previousContainerData : containerData;

    this.itemsChange.emit({
      completedTasks,
      uncompletedTasks,
    });
  }

  statusChange(task: Task): void {
    const tasks = [...this.tasks];
    const linkedTasks = [...this.linkedTaskList.tasks];
    removeItemById(tasks, task);
    linkedTasks.unshift(task);

    const completedTasks = task.status ? linkedTasks : tasks;
    const uncompletedTasks = task.status ? tasks : linkedTasks;

    this.itemsChange.emit({
      completedTasks,
      uncompletedTasks,
    });
  }

  removeTask(task: Task): void {
    const dialogRef = this.dialog.open<ConfirmDialogComponent, MatConfirmDialogData>(
      ConfirmDialogComponent,
      {
        data: {
          text: 'Вы точно хотите удалить задачу?',
        },
        autoFocus: false,
      }
    );

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: boolean) => {
        if (res) {
          const tasks = [...this.tasks];

          removeItemById(tasks, task);
          this.itemsChange.emit({
            [task.status ? 'completedTasks' : 'uncompletedTasks']: tasks,
          });
          this.notifyService.success(`Задача "${task.title}" успешно удалена!`);
        }
      });
  }
}
