import { Component, OnInit } from '@angular/core';
import { CalendarDay } from '../model/CalendarDay';
import { Reminder } from '../model/Reminder';
import { ReminderService } from '../service/reminder.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './app-calendar.component.html',
  styleUrls: ['./app-calendar.component.css']
})

export class AppCalendarComponent implements OnInit {

  public month: Date = new Date();
  public calendar: CalendarDay[] = []; 
  public calendarGrouped: CalendarDay[][] = []; 
  public reminders: Reminder[] = []; 

  
  constructor(
    private reminderService: ReminderService) {
      this.generateCalendar();
    }

    /**
     * Create the calendar for current month, adding previously saved reminders
     *    
     */
    private generateCalendar() {
      this.reminderService.getReminders()
      .subscribe(
        reminder => {            
          this.reminders = reminder;
          this.calendar = this.generateCalendarDays(this.month.getMonth());
          // group the in groups of 7 calendarDays (a week)
          this.calendarGrouped = this.groupDays(this.calendar,7);
        },
        error => console.log(error)
    )}
    

  ngOnInit(): void {}  
 
/**
 * Generate the calendar days for a given month, 
 * @param month 
 */
private generateCalendarDays(month: number): CalendarDay[] {    
        
    let calendar: CalendarDay[] = [];
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
      calendar.push(calendarDay);
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));     
    }
    return calendar;
 }

/**
 * Calculate the first date of calendar, for a given current date
 * It will be the last Sunday of previous month
 * 
 * @param selectedDate 
 * @returns the first date of calendar
 */
private getFisrtDayOfCalendar(selectedDate: Date): Date {

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
 * @returns the last date of calendar
 */
private getLastDayOfCalendar(selectedDate: Date): Date {
    
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

private getNumberOfDays(start: Date, end: Date): number {
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

/**
 * 
 * Groups the calendar days in the informed size
 * 
 * @param calendarDaysArray 
 * @param groupSize 
 * @returns the grouped calendar
 */    
private groupDays(calendarDaysArray: CalendarDay[], groupSize: number): any {
      let calendarDays: CalendarDay[][] = [];
      let group: CalendarDay[]  = [];
  
      for (var i = 1; i < calendarDaysArray.length+1; i++) {
        group.push(calendarDaysArray[i-1]);
        if (i % groupSize  === 0) {
          calendarDays.push(group);
          group = [];          
        }        
    }
      return calendarDays;
    }
  
  nextMonth(): void {
    this.month.setMonth(this.month.getMonth()+1);
    this.generateCalendar();
  }

  previousMonth(): void {
    this.month.setMonth(this.month.getMonth()-1);
    this.generateCalendar();
  }

  today(): void {
    this.month.setMonth(new Date().getMonth());
    this.generateCalendar();
  }
  
}