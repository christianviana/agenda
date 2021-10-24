import { Time } from '@angular/common';
import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  note: string;
  time: Time;
  color: string;
  city?: string;
}

@Component({
  selector: 'app-reminder-dialog',
  templateUrl: 'app-reminder-dialog.component.html',
})
export class AppReminderDialog {

  constructor(
    public dialogRef: MatDialogRef<AppReminderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}