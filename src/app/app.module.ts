import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
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

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  openLogoutDialog() {
    this.showLogoutDialog = true;
  }

  cancelLogout() {
    this.showLogoutDialog = false;
  }

  confirmLogout() {
    localStorage.removeItem('token');
    this.showLogoutDialog = false;
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
