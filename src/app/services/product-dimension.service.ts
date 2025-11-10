import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDimensionService {
  private baseUrl = "http://localhost:8080/api/dimensions";

  constructor(private http: HttpClient) {}

  saveDimension(dimData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, dimData, { responseType: 'text' });
  }
}
