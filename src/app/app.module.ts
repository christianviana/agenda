import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { AppCalendarComponent } from './app-calendar/app-calendar.component';
import { AppCalendarDayComponent } from './app-calendar-day/app-calendar-day.component';
import { AppReminderDialog } from './app-reminder-dialog/app-reminder-dialog.component';
import { AppReminderComponent } from './app-reminder/app-reminder.component';
import { CalendarDayService } from './service/calendarDay.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiCenterService } from './service/api-center.service';
import { ReminderService } from './service/reminder.service';
import { ReminderFacade } from './service/reminder.facade';
import { MessageService } from './service/message.service';
import { MatSnackBarModule } from '@angular/material/snack-bar'

@NgModule({
  declarations: [
    AppComponent,
    AppCalendarComponent,
    AppCalendarDayComponent,    
    AppReminderDialog, 
    AppReminderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AppReminderDialog
  ],
  providers: [CalendarDayService, ApiCenterService, 
      ReminderService, ReminderFacade, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
