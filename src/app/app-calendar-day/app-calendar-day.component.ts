import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarDay } from '../model/CalendarDay';
import { AppReminderDialog } from '../app-reminder-dialog/app-reminder-dialog.component';
import { Time } from '@angular/common';
import { Reminder } from '../model/Reminder';
import { ReminderService } from '../service/reminder.service';
import { ReminderFacade } from '../service/reminder.facade';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './app-calendar-day.component.html',
  styleUrls: ['./app-calendar-day.component.css']
})

export class AppCalendarDayComponent implements OnInit {

  @Input()
  public calendarDay!: CalendarDay;

  note?: string;
  time?: Time;
  color?: string;
  city?: string;
  reminder?: Reminder;
  
  ngOnInit(): void {
  }
  
  constructor(
      public dialog: MatDialog,
      private reminderService: ReminderService,
      public reminderFacade: ReminderFacade)
      {}

   public newReminder():void {    
      this.reminder = new Reminder(this.calendarDay.date, '09:00', '', '#0066ff');
      const dialogRef = this.dialog.open(AppReminderDialog, {
        height: '500px',
        width: '300px',
        data: {note: this.reminder.note, time: this.reminder.time, color: this.reminder.color, city: this.reminder.city}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed:' + result);        
        if (result && result[0] != '') {
          this.reminder = new Reminder(this.calendarDay.date, '', '', '#0066ff');
          this.reminder.note = result[0];
          this.reminder.time = result[1];
          this.reminder.color = result[2];
          this.reminder.city = result[3];
          this.reminderFacade.insertReminder(this.reminder);
          this.calendarDay.addReminder(this.reminder);
        }
      });    
   
    }

}
