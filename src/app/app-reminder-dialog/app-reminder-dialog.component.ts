import {Component, Inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Reminder } from '../model/Reminder';

export interface ReminderDialogData {
  reminder: Reminder;
}

@Component({
  selector: 'app-reminder-dialog',
  templateUrl: 'app-reminder-dialog.component.html',
})

export class AppReminderDialog {
  
  reminder: Reminder = new Reminder(new Date(), '','','#FFFFFF');

  constructor(
    private dialogRef: MatDialogRef<AppReminderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ReminderDialogData) {

      this.reminder.id = data.reminder.id;
      this.reminder.note = data.reminder.note;     
      this.reminder.date = data.reminder.date;
      this.reminder.time = data.reminder.time;
      this.reminder.color = data.reminder.color;
      this.reminder.city = data.reminder.city;

    //   this.form = new FormGroup({
    //   note: new FormControl(this.data.note, [
    //     Validators.required,
    //     Validators.maxLength(30)        
    //   ])
    // });
    }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  
  save(event: Event): void {    
    this.dialogRef.close();
  }


}