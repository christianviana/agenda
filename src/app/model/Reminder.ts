import { Time } from "@angular/common";

export class Reminder {
    
    date: Date;
    note: string;    
    time?: Time;
    color: string;
    city?: string;
    
    
    constructor(date: Date, note: string, color: string, city?: string) {
        this.date = date;
        this.note = note;
        this.color = color;
        this.city = city;
    }
}