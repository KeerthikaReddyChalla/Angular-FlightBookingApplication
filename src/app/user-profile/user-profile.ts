import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfileComponent implements OnInit {

  name = '';
  email = '';

  showChangePassword = false;

  passwordData = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name') || '';
    this.email = localStorage.getItem('email') || '';
  }

  toggleChangePassword() {
    this.showChangePassword = !this.showChangePassword;
  }

  changePassword() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.put(
      'http://localhost:8080/api/auth/change-password',
      {
        oldPassword: this.passwordData.oldPassword,
        newPassword: this.passwordData.newPassword
      },
      {
        headers,
        responseType: 'text'
      }
    ).subscribe({
      next: () => {
        alert('Password updated successfully');
        this.passwordData = {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        };
        this.showChangePassword = false;
      },
      error: () => {
        alert('Password change failed');
      }
    });
  }
}
