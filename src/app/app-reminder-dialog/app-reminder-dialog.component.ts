import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Reminder } from '../model/Reminder';
import { MessageService } from '../service/message.service';

export interface ReminderDialogData {
  reminder: Reminder
  isNew: boolean;
}

@Component({
  selector: 'app-reminder-dialog',
  templateUrl: 'app-reminder-dialog.component.html',
})

export class AppReminderDialog implements OnInit {
  noteFormControl = new FormControl();
  reminder: Reminder;
  isNew: boolean;
  
  constructor(
    private dialogRef: MatDialogRef<AppReminderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ReminderDialogData,
    private messageService: MessageService) {

      this.reminder = new Reminder('',new Date(),'','','');
      this.reminder.id = data.reminder.id;
      this.reminder.note = data.reminder.note;     
      this.reminder.date = data.reminder.date;
      this.reminder.time = data.reminder.time;
      this.reminder.color = data.reminder.color;
      this.reminder.city = data.reminder.city;

      this.isNew = data.isNew;

      this.noteFormControl = new FormControl(this.reminder.note, [
        Validators.required,
        Validators.maxLength(30)
      ]);
      
      }
  
    ngOnInit(): void {
    }

    save(event:Event): void {
      if (this.noteFormControl.invalid) {
          this.messageService.warning('Please inform a note.');  
          return;
      } 
      this.dialogRef.close([this.reminder]);
    }

}
