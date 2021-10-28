import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarDay } from '../model/CalendarDay';
import { AppReminderDialog } from '../app-reminder-dialog/app-reminder-dialog.component';
import { Reminder } from '../model/Reminder';
import { MessageService } from '../service/message.service';
import { ReminderService } from '../service/reminder.service';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './app-calendar-day.component.html',
  styleUrls: ['./app-calendar-day.component.css']
})

export class AppCalendarDayComponent implements OnInit {

  @Input()
  public calendarDay!: CalendarDay;

  @Input()
  public row: number = 0;

  @Input()
  public col: number = 0;  

  ngOnInit(): void {
  }
  
  constructor(
      private dialog: MatDialog,            
      private messageService: MessageService,
      private reminderService: ReminderService)
      {}

   public newReminder():void {    
    let newReminder = new Reminder('', this.calendarDay.date, '09:00', '', '#0066ff');
    const dialogRef = this.dialog.open(AppReminderDialog, {
      height: '430px',
      width: '330px',
      data: {reminder: newReminder, isNew: true}
    });
  
    dialogRef.afterClosed().subscribe(result => {        
      if (result && result[0]) {          
        newReminder = result[0];
        this.reminderService.insertReminder(newReminder)
          .subscribe( rem => {          
            this.calendarDay.addReminder(rem);
            this.messageService.success("Reminder added.");
          }, error => {
            this.messageService.error('Error adding reminder. See log for details.');            
            console.log(`Error adding reminder: ${error?.message}` );
          } );         
        }
    });    
   
    }

}
