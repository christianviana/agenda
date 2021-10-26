import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CentralizadorApisService } from "./centralizar-apis.service";
import { Observable } from "rxjs";
import { Reminder } from "../model/Reminder";

@Injectable()
export class ReminderService {
    headers = new HttpHeaders({ 'Content-Type': 'application/json' });    
    /**
     * API's URL
     */
    private api: string = this.centralizadorApis.getApi() + '/reminders';
    constructor(
        private http: HttpClient,
        private centralizadorApis: CentralizadorApisService) { };

    public getReminders(): Observable<Reminder[]> {
        return this.http.get<Reminder[]>(`${this.api}`);
      }

    public getRemindersByDateRange(start: Date, end: Date): Observable<Reminder[]> {
        return this.http.get<Reminder[]>(`${this.api}`+"?startingDate="+start+"&endDate="+end);
    }

    public insertReminder(reminder: Reminder): Observable<Reminder> {
        return this.http.post<Reminder>(`${this.api}`, reminder, { headers: this.headers } );
    }
    
    public updateReminder(reminder: Reminder): Observable<Reminder> {
        return this.http.put<Reminder>(`${this.api}/${reminder.id}`, reminder, { headers: this.headers } );
    }

    public deleteReminder(reminder: Reminder): Observable<Reminder> {
        return this.http.delete<Reminder>(`${this.api}/${reminder.id}`);
    }


}