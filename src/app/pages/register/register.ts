import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  form = {
    name: '',
    email: '',
    password: ''
  };

  message = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.message = '';
    this.messageType = '';

    this.authService.register(this.form).subscribe({
      next: (res) => {
        this.message = res; // "User registered"
        this.messageType = 'success';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        console.error(err);
        this.message = 'Registration failed';
        this.messageType = 'error';
      }
    });
  }
}
