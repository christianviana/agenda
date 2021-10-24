import { Time } from "@angular/common";

export class Reminder {
    
    note: string;
    time?: Time;
    color: string;
    city?: string;
    
    
    constructor(note: string, color: string, city?: string) {
        this.note = note;
        this.color = color;
        this.city = city;
    }
}