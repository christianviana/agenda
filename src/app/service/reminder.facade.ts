import { Injectable, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Reminder } from "../model/Reminder";
import { ReminderService } from "./reminder.service";

export interface Message {
    msg: string;
    type: 'error' | 'success';
  }

  export interface LocalizacaoState {
    loading: boolean;
    message: Message;
  }

@Injectable()
export class ReminderFacade implements OnDestroy {
    
  subscription: Subscription = new Subscription();

  constructor( private reminderService: ReminderService) { }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

  insertReminder( reminder: Reminder): void {
      this.reminderService.insertReminder( reminder )
          .subscribe( rem => {
          const message: Message = { msg: `Reminder added.`, type: 'success' };            
          }, error => {
          const message: Message = {
              msg: `Error: ${ error?.message }`,
              type: 'error',
          };
          } );
  }

  updateReminder( reminder: Reminder): void {
    this.reminderService.updateReminder( reminder )
        .subscribe( rem => {
        const message: Message = { msg: `Reminder updated.`, type: 'success' };            
        }, error => {
        const message: Message = {
            msg: `Error: ${ error?.message }`,
            type: 'error',
        };
        } );
  }

  
}