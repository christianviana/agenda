import { Injectable, OnDestroy } from "@angular/core";
import { Reminder } from "../model/Reminder";
import { ReminderService } from "./reminder.service";
import { MessageService } from "./message.service";


@Injectable()
export class ReminderFacade  {
    

  constructor(
    private reminderService: ReminderService, 
    private messageService: MessageService) 
    { }

  insertReminder( reminder: Reminder): void {
      this.reminderService.insertReminder( reminder )
          .subscribe( rem => {          
          this.messageService.success("Reminder added.");
          }, error => {
          this.messageService.error('Error adding reminder. See log for details.');            
          console.log(`Error adding reminder: ${error?.message}` );
          } );
  }

  updateReminder( reminder: Reminder): void {
    this.reminderService.updateReminder( reminder )
        .subscribe( rem => {        
        this.messageService.success("Reminder updated.");        
        }, error => {
          this.messageService.error('Error updating reminder. See log for details.');            
          console.log(`Error updating reminder: ${error?.message}` );
          } );
  }

  deleteReminder( reminder: Reminder): void {
    this.reminderService.deleteReminder( reminder )
        .subscribe( rem => {        
        this.messageService.success("Reminder deleted.");        
        }, error => {
          this.messageService.error('Error deleting reminder. See log for details.');            
          console.log(`Error deleting reminder: ${error?.message}` );
          }  );
  }

  getRemindersByDateRange(start: Date, end: Date): Reminder[] {
    let reminders: Reminder[] = [];     
    this.reminderService.getRemindersByDateRange(start, end)
      .subscribe(
        remindersLoaded => {              
          this.messageService.success("Reminders loaded.");
          reminders = remindersLoaded;        
        },
        error =>{
          this.messageService.error('Error loading reminders. See log for details.');            
          console.log(`Error loading reminders: ${error?.message}` );
          } 
      )
    return reminders;        
    }  

}