import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarDay } from '../model/CalendarDay';
import { AppReminderDialog } from '../app-reminder-dialog/app-reminder-dialog.component';
import { Time } from '@angular/common';
import { Reminder } from '../model/Reminder';
import { CalendarDayService } from '../service/calendarDay.service';
import { ReminderService } from '../service/reminder.service';

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
      private reminderService: ReminderService)
      {}

   public newReminder():void {    
     this.reminder = new Reminder(new Date(), '', '', '');
      const dialogRef = this.dialog.open(AppReminderDialog, {
        width: '400px',
        height: '500px',
        data: {note: this.reminder.note, time: this.reminder.time, color: this.reminder.color, city: this.reminder.city}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed:' + result);        
        this.reminder = new Reminder(new Date(), '', '', '');
        this.reminder.note = result[0];
        this.reminder.time = result[1];
        this.reminder.color = result[2];
        this.reminder.city = result[3];
        this.reminderService.insertReminder(this.reminder);
        this.calendarDay.addReminder(this.reminder);
      });    
    }

}
