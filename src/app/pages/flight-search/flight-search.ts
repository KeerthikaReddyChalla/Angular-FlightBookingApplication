import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flight-search.html',
  styleUrls: ['./flight-search.css']
})
export class FlightSearchComponent {

  form = {
    from: '',
    to: '',
    date: ''
  };

  flights: any[] = [];
  searched = false;
  loading = false;

  constructor(private http: HttpClient) {}

  searchFlights() {
    this.loading = true;

    const start = `${this.form.date}T00:00:00`;
    const end = `${this.form.date}T23:59:59`;

    const params = new HttpParams()
      .set('from', this.form.from.trim())
      .set('to', this.form.to.trim())
      .set('start', start)
      .set('end', end);

    this.http.post<any[]>(
      'http://localhost:8080/api/flight/search',
      null,                    
      { params }               
    ).subscribe({
      next: (res) => {
        this.flights = res;
        this.searched = true;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        alert('Failed to fetch flights');
        console.error(err);
      }
    });
  }
}
