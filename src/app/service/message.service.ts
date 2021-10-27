import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Injectable()
export class MessageService {

  constructor(
    public snackBar: MatSnackBar
    ) { }


  dismiss(): void {
    this.snackBar.dismiss();
  }

  success(message: string, duration?: number): void {
    if (!duration) {
      duration = 2000;
    }
    this.openSnackBar(message, ['snack-success'], duration);
  }

  error(message: string, duration?: number): void {
    this.openSnackBar(message, ['snack-error'], duration);
  }

  warning(message: string, duration?: number): void {
    this.openSnackBar(message, ['snack-warning'], duration);
  }

  info(message: string, duration?: number): void {
    if (!duration) {
      duration = 2000;
    }
    this.openSnackBar(message, ['snack-info'], duration);
  }

  private openSnackBar(message: string, extraClasses: string[], duration: number = 10000): void {
    const config = new MatSnackBarConfig();
    config.duration = duration;
    config.politeness = 'assertive';
    config.panelClass = extraClasses;
    this.snackBar.open(message, 'X', config);
  }
}
