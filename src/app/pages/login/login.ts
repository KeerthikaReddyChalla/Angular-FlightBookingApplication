import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { TokenService } from '../../services/token';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,          
  imports: [CommonModule, FormsModule, RouterModule],
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
    next: (res) => {

      localStorage.setItem('token', res.token);

      window.location.reload();

      this.router.navigate(['/flights']);
    },
    error: (err) => {
      console.error(err);
     
    }
  });
}

}
