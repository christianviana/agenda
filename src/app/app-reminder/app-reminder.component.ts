import { Component, Input, OnInit } from '@angular/core';
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
      height: '430px',
      width: '330px',
      data: {reminder: this.reminder, isNew: false}
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
        this.calendarDay.updateReminder(this.reminder);
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
        this.calendarDay.removeReminder(reminderToDelete);        
        this.messageService.success("Reminder deleted.");          
      }, error => {
        this.messageService.error('Error deleting reminder. See log for details.');            
        console.log(`Error deleting reminder: ${error?.message}` );
      } );         
      }
  }


}
