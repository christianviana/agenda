import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppReminderDialog } from '../app-reminder-dialog/app-reminder-dialog.component';
import { Reminder } from '../model/Reminder';
import { ReminderFacade } from '../service/reminder.facade';

@Component({
  selector: 'app-reminder',
  templateUrl: './app-reminder.component.html',
  styleUrls: ['./app-reminder.component.css']
})
export class AppReminderComponent implements OnInit {
 
  note?: string;
  time?: Time;
  color?: string;
  city?: string;

  constructor(
    public dialog: MatDialog,  
    public reminderFacade: ReminderFacade
  ) {}

  @Input()
  public reminder!: Reminder;

  ngOnInit(): void {
  }

  public editReminder():void {    
    const dialogRef = this.dialog.open(AppReminderDialog, {
      height: '500px',
      width: '300px',
      data: {note: this.reminder.note, time: this.reminder.time, color: this.reminder.color, city: this.reminder.city}
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result && result[0] != '') {
        this.reminder.note = result[0];
        this.reminder.time = result[1];
        this.reminder.color = result[2];
        this.reminder.city = result[3];
        this.reminderFacade.updateReminder(this.reminder);
      }      
    });
    
  }
}
