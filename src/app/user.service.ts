import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://app-5431ca0d-ad85-45fb-86e3-1018062b316c.cleverapps.io/api/users'; // your backend endpoint
  // private baseUrl = 'http://localhost:8080/api/users'; // your backend endpoint

  constructor(private http: HttpClient) {}

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, user);
  }
}
