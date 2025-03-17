import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotifyService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string): void {
    this.snackBar.open(message, null, {
      panelClass: 'app-success-snackbar',
    });
  }

  error(message: string): void {
    this.snackBar.open(message, null, {
      panelClass: 'app-error-snackbar',
    });
  }
}
