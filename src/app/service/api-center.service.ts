import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiCenterService {

  endpoints = environment.endpoints;

  public getApi(): string {
      return this.endpoints.api;
  }

}
