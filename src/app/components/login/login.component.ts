import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';
  messageClass = '';

  constructor(private auth: AuthService, private router: Router) {
    // if already logged in redirect to dashboard
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  forgotPassword() {
    alert("Please contact admin to reset your password.");
  }


  login() {
    this.message = '';
    this.auth.login(this.username, this.password).subscribe({
      next: (res: any) => {
        // backend returns {message, username, role}
        if (res && res.role) {
          this.auth.setSession(res.username, res.role);
          this.message = '✅ Login successful! Redirecting...';
          this.messageClass = 'text-success';
          setTimeout(() => this.router.navigate(['/dashboard']), 700);
        } else if (res && typeof res.message === 'string' && res.message.toLowerCase().includes('success')) {
          // fallback: backend sends message only
          const role = this.username === 'admin' ? 'ADMIN' : 'USER';
          this.auth.setSession(this.username, role);
          this.message = '✅ Login successful! Redirecting...';
          this.messageClass = 'text-success';
          setTimeout(() => this.router.navigate(['/dashboard']), 700);
        } else {
          this.message = '❌ Invalid credentials';
          this.messageClass = 'text-danger';
        }
      },
      error: () => {
        this.message = '❌ Server error';
        this.messageClass = 'text-danger';
      }
    });
  }
}
