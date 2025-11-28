import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Backend endpoint
    // private baseUrl = 'https://app-5431ca0d-ad85-45fb-86e3-1018062b316c.cleverapps.io/api/users'; // your backend endpoint

  private baseUrl = 'http://localhost:8080/api/users';
  // Or from environment
  // private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Add user (optional, older method)
  addUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, user);
  }

  // Signup user (creates user and sends OTP)
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  // Verify OTP
  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify-otp`, { email, otp });
  }

  // Resend OTP
  resendOtp(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/resend-otp`, { email });
  }
}
