import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PasswordGuard implements CanActivate {

  constructor(private router: Router) {}

 canActivate(): boolean {
  const forceChange = localStorage.getItem('forcePasswordChange') === 'true';

  if (forceChange) {
    this.router.navigate(['/profile']); // change password page
    return false;
  }
  return true;
}
}