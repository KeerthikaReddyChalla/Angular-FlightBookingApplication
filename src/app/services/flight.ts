import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FlightService {

  private API = 'http://localhost:8080/api/flights';

  constructor(private http: HttpClient) {}

  search(params: any) {
    return this.http.get<any[]>(`${this.API}/search`, { params });
  }
}
