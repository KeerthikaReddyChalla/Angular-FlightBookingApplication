import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],   
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPassword {

  email: string = '';

  constructor(private http: HttpClient) {}

  sendResetLink() {
    this.http.post(
      'http://localhost:8080/api/auth/forgot-password',
      null,
      { params: { email: this.email }, responseType: 'text' }
    ).subscribe({
      next: () => alert('Reset link sent to email'),
      error: () => alert('User not found or error occurred')
    });
  }
}
