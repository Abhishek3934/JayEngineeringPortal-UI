import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER', Validators.required]  // default role USER
    });
  }

  get f() { return this.addUserForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.addUserForm.invalid) {
      return;
    }

    this.userService.addUser(this.addUserForm.value).subscribe({
      next: (res) => {
        alert('User added successfully!');
        this.addUserForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        console.error(err);
        alert('Error adding user');
      }
    });
  }
}
