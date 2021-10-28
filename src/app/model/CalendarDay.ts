import { Reminder } from "./Reminder";

export class CalendarDay {

  public isToday: boolean;
  public reminders: Reminder[];
  date: Date;

  constructor(d: Date) {
      this.date = d;        
      this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
      this.reminders = [];
    }

  public addReminder(reminder: Reminder): void {
    this.reminders.push(reminder);
  }

  public getSortedReminders(): Reminder[] {
    return this.reminders.sort( (rem1,rem2) => rem1.time.localeCompare(rem2.time) );
  }
  
}
