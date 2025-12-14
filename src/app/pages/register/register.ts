import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  form = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.authService.register(this.form).subscribe({
      next: () => {
        alert('Registered successfully');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Registration failed');
      }
    });
  }
}
