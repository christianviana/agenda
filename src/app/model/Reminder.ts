export class Reminder {
    
    id?: string;
    date: Date;
    note: string;    
    time: string;
    color: string;
    city?: string;
    
    
    constructor(date: Date, time: string, note: string, color: string, city?: string) {
        this.date = date;
        this.time = time;
        this.note = note;
        this.color = color;
        this.city = city;
    }
}