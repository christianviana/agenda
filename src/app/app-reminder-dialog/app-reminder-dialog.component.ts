import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Reminder } from '../model/Reminder';

export interface ReminderDialogData {
  reminder: Reminder;
}

@Component({
  selector: 'app-reminder-dialog',
  templateUrl: 'app-reminder-dialog.component.html',
})

export class AppReminderDialog implements OnInit {
  
  reminder: Reminder = new Reminder('', new Date(), '','','#FFFFFF');

  constructor(
    private dialogRef: MatDialogRef<AppReminderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ReminderDialogData) {

      this.reminder.id = data.reminder.id;
      this.reminder.note = data.reminder.note;     
      this.reminder.date = data.reminder.date;
      this.reminder.time = data.reminder.time;
      this.reminder.color = data.reminder.color;
      this.reminder.city = data.reminder.city;
    }
  
    ngOnInit(): void {
     
    
    }

}