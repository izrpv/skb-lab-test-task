import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../models/task';
import { MatFormDialogData } from '../types/mat-form-dialog-data';

@Component({
  selector: 'app-task-dialog-form',
  templateUrl: './task-dialog-form.component.html',
  styleUrls: ['./task-dialog-form.component.scss'],
})
export class TaskDialogFormComponent {
  formGroup = new FormGroup({
    id: new FormControl(null),
    status: new FormControl(false, Validators.required),
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    deadline: new FormControl(null, Validators.required),
  });

  // Используется readOnly внутри шаблона с целью сохранить читаемость (disabled делает текст серым и более блёклым)
  get readOnly(): boolean {
    return this.dialogData?.readonly;
  }

  get entity(): Task {
    return this.dialogData?.entity;
  }

  get isNew(): boolean {
    return !(typeof this.entity?.id === 'number');
  }

  get isFromValid(): boolean {
    return this.formGroup.valid;
  }

  get dialogTitle(): string {
    return this.isNew ? 'Создание' : this.dialogData.readonly ? 'Просмотр' : 'Редактирование';
  }

  constructor(
    public dialogRef: MatDialogRef<TaskDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: MatFormDialogData<Task>
  ) {
    if (dialogData?.entity) {
      this.formGroup.patchValue(dialogData.entity);
    }
  }

  save(): void {
    const formGroup = this.formGroup;

    if (this.isNew) {
      formGroup.patchValue({ id: Date.now() });
    }

    this.dialogRef.close(this.formGroup.value);
  }
}
