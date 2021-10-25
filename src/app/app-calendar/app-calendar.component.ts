import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
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

  /**
   * Create the calendar for current month, adding previously saved reminders
   * @param reminderService 
   */
  constructor(
    private reminderService: ReminderService) {
      this.reminderService.getReminders()
        .subscribe(
          reminder => {            
            this.reminders = reminder;
            this.generateCalendarDays(new Date().getMonth());
          },
          error => console.log(error)
      );

    }

  ngOnInit(): void {}  
 
/**
 * Generate the calendar days for a given month, 
 * @param month 
 */
private generateCalendarDays(month: number): void {    
        
    this.calendar = [];
    let day: Date = new Date()
    day.setHours(0,0,0,0);
    day.setMonth(month);

    // find first and last days of calendar, and number of days
    let firstDay = this.getFisrtDayOfCalendar(day);
    let lastDay = this.getLastDayOfCalendar(day);
    let numOfDaysCalendar = this.getNumberOfDays(firstDay,lastDay)+1;

    // variable that will get increased in the 'for' loop
    let dateToAdd = firstDay;
    let calendarDay: CalendarDay;
    let reminderstoAdd: Reminder[];

    // create a calendar array from firstDay to lastDay, adding existing reminders
    for (var i = 0; i < numOfDaysCalendar; i++) {
      calendarDay = new CalendarDay(new Date(dateToAdd));
      // if reminders already exist, add them to current calendarDay
      reminderstoAdd = this.reminders.filter( d => new Date(d.date).getTime() == dateToAdd.getTime());
      if (reminderstoAdd.length != 0) {         
        calendarDay.reminders = calendarDay.reminders.concat(reminderstoAdd);        
      } 
      this.calendar.push(calendarDay);
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));     
    }
 }

/**
 * Calculate the first date of calendar, for a given current date
 * It will be the last Sunday of previous month
 * 
 * @param selectedDate 
 * @returns 
 */
private getFisrtDayOfCalendar(selectedDate: Date) {

    // set starting date as last day of previous month
    let startDate: Date = new Date(selectedDate);
    startDate.setDate(0);
    
    // go back in days until last Sunday of previous month
    while (startDate.getDay() != 0) {
        startDate = new Date(startDate.setDate(startDate.getDate() - 1));
    }      
    
    return startDate;
 }

/**
 * Calculate the last date of calendar, for a given current date
 * It will be the last Saturday of last week of current month
 * 
 * @param selectedDate 
 * @returns 
 */
private getLastDayOfCalendar(selectedDate: Date) {
    
    // set the finishing date as last day of this month
    let finishDate: Date = selectedDate;   
    finishDate.setMonth(finishDate.getMonth()+1);
    finishDate.setDate(0);
    
    // go forward until we encounter last Saturday of current calendar
    while (finishDate.getDay() != 6) {
        finishDate = new Date(finishDate.setDate(finishDate.getDate() + 1));
    }
    return finishDate;
}

private getNumberOfDays(start: Date, end: Date) {
  const date1 = new Date(start);
  date1.setHours(0, 0, 0, 0);
  const date2 = new Date(end);
  date2.setHours(0, 0, 0, 0);
  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;
  // time difference between dates
  const diffInTime = date2.getTime() - date1.getTime();
  // number of days between the dates
  const diffInDays = Math.round(diffInTime / oneDay);
  return diffInDays;
  }
}

@Pipe({
  name: 'group'
})
export class GroupPipe implements PipeTransform {

  transform(calendarDaysArray: CalendarDay[], groupSize: number): any {
    let calendarDays: CalendarDay[][] = [];
    let weekDays: CalendarDay[]  = [];

    calendarDaysArray.map((day: CalendarDay, index: number) => {
        weekDays.push(day);
        // here we need to use ++ in front of the variable else index increase 
        //will happen after the evaluation but we need it to happen BEFORE
        if (++index % groupSize  === 0) {
          calendarDays.push(weekDays);
          weekDays = [];          
        }
    });
    return calendarDays;
  }
}
