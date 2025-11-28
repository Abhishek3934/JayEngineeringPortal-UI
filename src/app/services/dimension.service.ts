import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DimensionService {

  // private baseUrl = "https://app-5431ca0d-ad85-45fb-86e3-1018062b316c.cleverapps.io/api/dimensions";
  private baseUrl = "http://localhost:8080/api/dimensions";


  constructor(private http: HttpClient) {}

  saveDimension(dimData: any) {
    return this.http.post(`${this.baseUrl}/add`, dimData);
  }

}
