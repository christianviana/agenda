import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppReminderDialog } from '../app-reminder-dialog/app-reminder-dialog.component';
import { Reminder } from '../model/Reminder';
import { ReminderService } from '../service/reminder.service';
import { MessageService } from '../service/message.service';

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

  ngOnInit(): void {
  }

  public editReminder():void {        

    const dialogRef = this.dialog.open(AppReminderDialog, {
      height: '500px',
      width: '300px',
      data: {reminder: this.reminder}
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result && result[0]) {    
        let updatedReminder = result[0];
        this.reminderService.updateReminder(updatedReminder)
        .subscribe( rem => {                   
          this.reminder = updatedReminder;
          this.messageService.success("Reminder updated.");          
        }, error => {
          this.messageService.error('Error updating reminder. See log for details.');            
          console.log(`Error updating reminder: ${error?.message}` );
        } );         
        }
    });    
    
  }
}
