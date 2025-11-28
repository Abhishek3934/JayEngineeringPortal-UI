import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  otpForm!: FormGroup;
  step: 'form' | 'otp' | 'done' = 'form';
  message = '';
  emailForVerification = '';

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    // Signup form
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    // OTP form
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
    this.signupForm.get('role')?.valueChanges.subscribe(role => {
      if (role === 'ADMIN') {
        this.signupForm.get('email')?.setValue('gangurdeabhi87@gmail.com');
        this.signupForm.get('email')?.disable();  // disable field
      } else {
        this.signupForm.get('email')?.enable();   // enable field for USER
        this.signupForm.get('email')?.reset();
      }
    });
  }

  // Submit signup form
  onSubmit() {
  if (this.signupForm.invalid) return;

  // Check password length
  const password = this.signupForm.value.password;
  if (!password || password.length < 8) {
    alert('Password must be at least 8 characters long.');
    return;
  }

  // 🔥 If admin → force OTP email
  let finalEmail = this.signupForm.value.role === 'ADMIN'
    ? 'gangurdeabhi87@gmail.com'
    : this.signupForm.value.email;

  // Replace email before sending to backend
  const payload = { ...this.signupForm.value, email: finalEmail };

  this.message = 'Submitting...';

  this.userService.createUser(payload).subscribe({
    next: (res: any) => {
      if (res && res.success) {
        this.emailForVerification = finalEmail;
        this.step = 'otp';
        this.message = 'OTP sent to your email. Enter it below.';
      } else {
        this.message = res?.message || 'Signup failed';
      }
    },
    error: (err) => {
      if (err.status === 409) {
        alert("Username or Email already exists!");
      } else {
        alert("Server error while signing up");
      }
    }
  });
}


  passwordTimer: any;


  checkPassword() {
    const p = this.signupForm.value.password;

    // Clear previous timer so it doesn't stack
    clearTimeout(this.passwordTimer);

    // Only start timer if user has entered something
    if (p && p.length > 0 && p.length < 8) {
      this.passwordTimer = setTimeout(() => {
        // Check again after 10 seconds before alerting
        const pwd = this.signupForm.value.password;
        if (pwd && pwd.length < 8) {
          alert("Password must be at least 8 characters long!");
        }
      }, 5000); // 10 seconds
    }
  }


  checkUsername() {
    const username = this.signupForm.value.username;
    if (username && username.trim().length < 3) {
      alert("Username must be at least 3 characters!");
    }
  }



  // Verify OTP
  verifyOtp() {
    if (this.otpForm.invalid) return;

    const otp = this.otpForm.value.otp;
    this.userService.verifyOtp(this.emailForVerification, otp).subscribe({
      next: (res: any) => {
        if (res && res.success) {
          this.step = 'done';
          this.message = 'Email verified — signup complete. You may login.';
          this.signupForm.reset();
          this.otpForm.reset();
        } else {
          this.message = res?.message || 'Invalid or expired OTP';
        }
      },
      error: (err) => {
        this.message = err?.error?.message || 'OTP verification failed';
        console.error(err);
      }
    });
  }

  // Resend OTP
  resendOtp() {
    this.userService.resendOtp(this.emailForVerification).subscribe({
      next: (res: any) => {
        this.message = res?.message || 'OTP resent';
      },
      error: (err) => {
        this.message = 'Could not resend OTP';
        console.error(err);
      }
    });
  }
}



