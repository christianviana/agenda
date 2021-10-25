import { Component, Inject, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarDay } from '../model/CalendarDay';
import { Reminder } from '../model/Reminder';
import { ReminderService } from '../service/reminder.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './app-calendar.component.html',
  styleUrls: ['./app-calendar.component.css']
})

export class AppCalendarComponent implements OnInit {

  public calendar: CalendarDay[] = []; 
  public reminders: Reminder[] = []; 
  constructor(
    public dialog: MatDialog,  
    private reminderService: ReminderService) {
      this.reminderService.getReminders()
        .subscribe(
          rem => {            
            this.reminders = rem,
            this.generateCalendarDays(new Date().getMonth());
          },
          error => console.log(error)
      );

    }

  ngOnInit(): void {}  
 

  private generateCalendarDays(month: number): void {    
    
    // we reset our calendar every time
    this.calendar = [];

    // we set the date 
    let day: Date = new Date()
    day.setHours(0,0,0,0);
    day.setMonth(month);

    // here we find the first day that our calendar will start from
    // it would be the last Monday of the previous month
    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    // dateToAdd is an intermediate variable that will get increased
    // in the following for loop
    let dateToAdd = startingDateOfCalendar;

    // ok since we have our starting date then we get the next 41 days 
    // that we need to add in our calendar array
    // 41 cause our calendar will show 6 weeks and MATH say that
    // 6 weeks * 7 days = 42!!
    day = new Date();
    let finishingDateOfCalendar = this.getFinishDateForCalendar(day);
    let calendarDay: CalendarDay;
    let dif = this.getNumberOfDays(startingDateOfCalendar,finishingDateOfCalendar);
    let cday: Reminder[];
    for (var i = 0; i < 42; i++) {
      calendarDay = new CalendarDay(new Date(dateToAdd));
      cday = this.reminders.filter( d => new Date(d.date).getTime() == dateToAdd.getTime());
      if (cday.length != 0) {         
        calendarDay.reminders = calendarDay.reminders.concat(cday);        
      } 
      this.calendar.push(calendarDay);
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
     
    }
  }


  private getStartDateForCalendar(selectedDate: Date) {
    // for the day we selected let's get the previous month last day
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

    // start by setting the starting date of the calendar same as the last day of previous month
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    // but since we actually want to find the last Sunday of previous month
    // we will start going back in days until we encounter our last Sunday of previous month
    if (startingDateOfCalendar.getDay() != 0) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() != 0);
    }

    return startingDateOfCalendar;
  }


  private getFinishDateForCalendar(selectedDate: Date) {
    
    // start by setting the finishing date of the calendar same as the last day of this month
    let finishingDateOfCalendar: Date = selectedDate;   
    finishingDateOfCalendar.setMonth(finishingDateOfCalendar.getMonth()+1);
    finishingDateOfCalendar.setDate(0);
    
    // but since we actually want to find the last Saturday of current calendar
    // we will start going forward in days until we encounter our last Saturday of current calendar
    if (finishingDateOfCalendar.getDay() != 6) {
      do {
        finishingDateOfCalendar = new Date(finishingDateOfCalendar.setDate(finishingDateOfCalendar.getDate() + 1));
      } while (finishingDateOfCalendar.getDay() != 6);
    }

    return finishingDateOfCalendar;
  }

  private getNumberOfDays(start: Date, end: Date) {
    const date1 = new Date(start);
    date1.setHours(0, 0, 0, 0);
    const date2 = new Date(end);
    date2.setHours(0, 0, 0, 0);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  }
}

@Pipe({
  name: 'chunk'
})
export class ChunkPipe implements PipeTransform {

  transform(calendarDaysArray: CalendarDay[], chunkSize: number): any {
    let calendarDays: CalendarDay[][] = [];
    let weekDays: CalendarDay[]  = [];

    calendarDaysArray.map((day: CalendarDay, index: number) => {
        weekDays.push(day);
        // here we need to use ++ in front of the variable else index increase 
        //will happen after the evaluation but we need it to happen BEFORE
        if (++index % chunkSize  === 0) {
          calendarDays.push(weekDays);
          weekDays = [];          
        }
    });
    return calendarDays;
  }
}
