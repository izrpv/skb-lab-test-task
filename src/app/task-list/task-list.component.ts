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

    if (previousContainer === container) {
      moveItemInArray(container.data, previousIndex, currentIndex);
      return;
    }

    const previousData = previousContainer.data[previousIndex];

    previousData.status = !previousData.status;
    transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex);
  }

  statusChange(task: Task): void {
    removeItemById(this.tasks, task);
    this.linkedTaskList.tasks.unshift(task);
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
          removeItemById(this.tasks, task);
          this.notifyService.success(`Задача "${task.title}" успешно удалена!`);
        }
      });
  }
}
