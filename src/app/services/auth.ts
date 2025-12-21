import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private API = 'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  login(data: any) {
    return this.http.post<any>(`${this.API}/login`, data);
  }


  register(data: any): Observable<string> {
    return this.http.post(
      `${this.API}/register`,
      data,
      { responseType: 'text' }
    );
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'ROLE_ADMIN';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('name');

    // force UI refresh + navigation
    this.router.navigate(['/']);
  }
}
