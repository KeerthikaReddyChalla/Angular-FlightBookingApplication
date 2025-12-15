import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { TokenService } from '../../services/token';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,          
  imports: [CommonModule, FormsModule],
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
