import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { TokenService } from '../../services/token';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
 private getEmailFromToken(token: string): string {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  }
  login() {
  this.authService.login(this.form).subscribe({
    next: (res) => {
      this.snackBar.open(
      'User logged in successfully',
      'Close',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['success-toast']
      }
    );
      localStorage.setItem('token', res.token);
      const email = this.getEmailFromToken(res.token);
      localStorage.setItem('email', email);
     const payload = JSON.parse(atob(res.token.split('.')[1]));
localStorage.setItem('name', payload.name);

   
      window.location.reload();

      this.router.navigate(['/flights']);
    },
    error: (err) => {
      this.snackBar.open(
      'User Login failed',
      'Close',
      {
        duration: 3500,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['error-toast']
      }
    );
      console.error(err);
     
    }
  });
}

}
