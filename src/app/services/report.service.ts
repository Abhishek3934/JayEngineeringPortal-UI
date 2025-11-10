import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  downloadPdf(productId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/pdf/${productId}`, { responseType: 'blob' });
  }

  downloadExcel(productId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/excel/${productId}`, { responseType: 'blob' });
  }

  downloadExcelTemplate(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/template`, { responseType: 'blob' });
  }

  printReport(productId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/print/${productId}`, { responseType: 'blob' });
  }
}
