import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.api}/api/auth/login`, { username, password });
  }

  sendOtp(email: string) {
    return this.http.post<any>('https://app-5431ca0d-ad85-45fb-86e3-1018062b316c.cleverapps.io/api/users/forgot-password/send-otp', { email });
  }

  verifyOtp(email: string, otp: string) {
    return this.http.post<any>('https://app-5431ca0d-ad85-45fb-86e3-1018062b316c.cleverapps.io/api/users/forgot-password/verify-otp', { email, otp });
  }

  resetPassword(email: string, newPassword: string) {
    return this.http.post<any>('https://app-5431ca0d-ad85-45fb-86e3-1018062b316c.cleverapps.io/api/users/forgot-password/reset', { email, newPassword });
  }





  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('username');
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  setSession(username: string, role: string) {
    localStorage.setItem('username', username.trim());
    localStorage.setItem('role', role.trim().toUpperCase());
  }

  getRole(): string {
    return (localStorage.getItem('role') || '').trim().toUpperCase();
  }

}
