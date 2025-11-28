import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { Router } from '@angular/router';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {

  step = 1;

  email = '';
  otp = '';
  newPassword = '';

  message = '';

  constructor(private auth: AuthService,private router: Router) {}

  sendOtp() {
    this.message = "Sending OTP...";

    this.auth.sendOtp(this.email).subscribe(res => {
      this.message = res.message;
      if (res.message === 'OTP sent to your email') {
        this.step = 2;
      }
    });
  }


  verifyOtp() {
    this.auth.verifyOtp(this.email, this.otp).subscribe(res => {
      this.message = res.message;
      if (res.message === 'OTP verified') this.step = 3;
    });
  }

  resetPassword() {
    this.auth.resetPassword(this.email, this.newPassword).subscribe(res => {
      this.message = res.message;
      if (res.message === 'Password reset successfully') {
        alert("Please login again with new password");
        this.router.navigate(['/login']);   // 🔥 redirect to login

      }
    });
  }
}


