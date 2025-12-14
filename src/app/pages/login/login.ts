import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { TokenService } from '../../services/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
login() {
  this.authService.login(this.form).subscribe({
    next: res => {
      this.tokenService.saveToken(res.token);
      this.router.navigate(['/flights']);
    },
    error: err => alert('Login failed')
  });
}
}
