import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CentralizadorApisService } from "./centralizar-apis.service";
import { Observable } from "rxjs";
import { CalendarDay } from "../model/CalendarDay";

@Injectable()
export class CalendarDayService {
    headers = new HttpHeaders({ 'Content-Type': 'application/json' });    
    /**
     * API's URL
     */
    private api: string = this.centralizadorApis.getApi() + '/calendar-days';
    constructor(
        private http: HttpClient,
        private centralizadorApis: CentralizadorApisService) { };

    public getCalendarDays(): Observable<CalendarDay[]> {
        return this.http.get<CalendarDay[]>(`${this.api}`);
      }

    public insertCalendarDay(calendarDay: CalendarDay): Observable<CalendarDay> {
        return this.http.post<CalendarDay>(`${this.api}`,  { headers: this.headers } );
    }
    
}