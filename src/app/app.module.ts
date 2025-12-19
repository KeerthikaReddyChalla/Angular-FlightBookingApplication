import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('flight-booking-ui');

  isLoggedIn = false;
  showLogoutDialog = false;

  constructor(private router: Router) {
    this.checkLoginStatus();
  }

  // check login using token
  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  // open confirmation dialog
  openLogoutDialog() {
    this.showLogoutDialog = true;
  }

  // cancel logout
  cancelLogout() {
    this.showLogoutDialog = false;
  }

  // confirm logout
  confirmLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email'); 
    this.showLogoutDialog = false;
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
