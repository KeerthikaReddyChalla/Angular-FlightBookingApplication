import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,          
  imports: [CommonModule, FormsModule],
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
