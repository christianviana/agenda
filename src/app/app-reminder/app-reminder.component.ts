import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppReminderDialog } from '../app-reminder-dialog/app-reminder-dialog.component';
import { Reminder } from '../model/Reminder';
import { ReminderService } from '../service/reminder.service';
import { MessageService } from '../service/message.service';
import { CalendarDay } from '../model/CalendarDay';

@Component({
  selector: 'app-reminder',
  templateUrl: './app-reminder.component.html',
  styleUrls: ['./app-reminder.component.css']
})
export class AppReminderComponent implements OnInit {
  

  constructor(
    private dialog: MatDialog,  
    private reminderService: ReminderService,
    private messageService: MessageService
  ) {}

  @Input()
  public reminder!: Reminder;

  @Input()
  public calendarDay!: CalendarDay;

  ngOnInit(): void {
  }

  public editReminder():void {        

    const dialogRef = this.dialog.open(AppReminderDialog, {
      height: '500px',
      width: '300px',
      data: {reminder: this.reminder}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result[1]) {
          this.deleteReminder(result[0]);          
        } else {
          this.upDateReminder(result[0]);
        }
      }
    });        
  }

  private upDateReminder(reminderToUpdade: Reminder):void {
    if (reminderToUpdade) {          
      this.reminderService.updateReminder(reminderToUpdade)
      .subscribe( rem => {                   
        this.reminder = reminderToUpdade;
        this.messageService.success("Reminder updated.");          
      }, error => {
        this.messageService.error('Error updating reminder. See log for details.');            
        console.log(`Error updating reminder: ${error?.message}` );
      } );         
      }
  }

  private deleteReminder(reminderToDelete: Reminder):void {
    if (reminderToDelete) {          
      this.reminderService.deleteReminder(reminderToDelete)
      .subscribe( rem => {                   
        this.calendarDay.reminders = this.calendarDay.reminders.filter(r => r.id!== reminderToDelete.id);
        this.messageService.success("Reminder deleted.");          
      }, error => {
        this.messageService.error('Error deleting reminder. See log for details.');            
        console.log(`Error deleting reminder: ${error?.message}` );
      } );         
      }
  }


}
