import { Time } from '@angular/common';
import {Component, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AppReminderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

      this.form = new FormGroup({
      note: new FormControl(this.data.note, [
        Validators.required,
        Validators.maxLength(30)        
      ])
    });
    }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    
    this.dialogRef.close();
  }

  get note() { return this.form.get('note'); }

}