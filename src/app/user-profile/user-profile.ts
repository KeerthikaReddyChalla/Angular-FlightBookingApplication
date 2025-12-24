import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name') || '';
    this.email = localStorage.getItem('email') || '';
  }

  toggleChangePassword() {
    this.showChangePassword = !this.showChangePassword;
  }

 changePassword() {


  if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
    this.snackBar.open(
      'New password and confirm password do not match',
      'Close',
      {
        duration: 3500,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['error-toast']
      }
    );
    return;
  }


  if (!this.isStrongPassword(this.passwordData.newPassword)) {
    this.snackBar.open(
      'Password must be at least 8 characters and include an uppercase letter, number, and special character',
      'Close',
      {
        duration: 4500,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['error-toast']
      }
    );
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
      this.snackBar.open(
        'Password changed successfully',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['success-toast']
        }
      );

      this.passwordData = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      };
      this.showChangePassword = false;
    },
    error: () => {
      this.snackBar.open(
        'Password change failed',
        'Close',
        {
          duration: 3500,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['error-toast']
        }
      );
    }
  });
}
isStrongPassword(password: string): boolean {
  const strongPasswordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
}


}
