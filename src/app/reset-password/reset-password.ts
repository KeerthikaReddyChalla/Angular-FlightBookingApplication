import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPassword implements OnInit {

  token = '';
  newPassword = '';
  confirmPassword = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  resetPassword() {

    if (this.newPassword !== this.confirmPassword) {
      this.snackBar.open(
        'Passwords do not match',
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

    this.http.post(
      'http://localhost:8080/api/auth/reset-password',
      {
        token: this.token,
        newPassword: this.newPassword
      },
      { responseType: 'text' }
    ).subscribe({
      next: () => {
        this.snackBar.open(
          'Password reset successful. Please login.',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['success-toast']
          }
        );

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1200);
      },

      error: (err) => {
  
        const message =
          typeof err.error === 'string' && err.error.length > 0
            ? err.error
            : 'Reset failed or token expired';

        this.snackBar.open(
          message,
          'Close',
          {
            duration: 4500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['error-toast']
          }
        );
      }
    });
  }
}
