import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
[x: string]: any;
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
  }
}
