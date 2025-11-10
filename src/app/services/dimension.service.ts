import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DimensionService {

  private baseUrl = "http://localhost:8080/api/dimensions";

  constructor(private http: HttpClient) {}

  saveDimension(dimData: any) {
    return this.http.post(`${this.baseUrl}/add`, dimData);
  }

}
