import { Component, signal } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('flight-booking-ui');

  isHomePage = false;
  isLoggedIn = false;
  showLogoutDialog = false;

  constructor(private router: Router, public auth: AuthService) {

    // initial check
    this.checkLoginStatus();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = event.urlAfterRedirects === '/home';
        this.checkLoginStatus(); // ✅ IMPORTANT
      }
    });
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
    this.showLogoutDialog = false;
    this.auth.logout(); 
  }

}
