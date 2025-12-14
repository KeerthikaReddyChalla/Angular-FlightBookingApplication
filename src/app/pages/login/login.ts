import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { TokenService } from '../../services/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {


  form = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.form).subscribe({
      next: (res: any) => {
        this.tokenService.saveToken(res.token);
        this.router.navigate(['/flights']);
      },
      error: () => {
        alert('Login failed');
      }
    });
  }
}
