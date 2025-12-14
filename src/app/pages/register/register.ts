import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
register() {
  this.authService.register(this.form).subscribe({
    next: () => {
      alert('Registered successfully');
      this.router.navigate(['/login']);
    }
  });
}

}
