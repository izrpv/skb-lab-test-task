import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskDialogFormComponent } from './task-dialog-form/task-dialog-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskListComponent } from './task-list/task-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskItemComponent } from './task-item/task-item.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatMenuModule } from '@angular/material/menu';

const materialModules = [
  DragDropModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatMenuModule,
];

const matDateLocaleProvider = { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' };
const matSnackBarDefaultOptionsProvider = {
  provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
  useValue: {
    duration: 1500,
    horizontalPosition: 'left',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    TaskDialogFormComponent,
    TaskListComponent,
    TaskItemComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    OverlayModule,
    BrowserAnimationsModule,
    ...materialModules,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [matDateLocaleProvider, matSnackBarDefaultOptionsProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
