import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private API = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(`${this.API}/login`, data);
  }

  register(data: any): Observable<string> {
  return this.http.post(
    `${this.API}/register`,
    data,
    {
      responseType: 'text'
    }
  );
}


}
