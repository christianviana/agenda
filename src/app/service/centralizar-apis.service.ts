import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class CentralizadorApisService {

  endpoints = environment.endpoints;

  public getApi(): string {
      return this.endpoints.api;
  }

}
