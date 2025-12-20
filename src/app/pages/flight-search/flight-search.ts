import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './flight-search.html',
  styleUrls: ['./flight-search.css']
})
export class FlightSearchComponent {

  // ENUM city list
  cities = ['HYD', 'DEL', 'BLR', 'MUM', 'CHE', 'KOL', 'GOA'];

  minDate: string = new Date().toISOString().split('T')[0];

  form = {
    from: '',
    to: '',
    date: ''
  };

  flights: any[] = [];
  searched = false;
  loading = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  searchFlights() {
    this.loading = true;
    this.searched = false;
    const start = `${this.form.date}T00:00:00`;
    const end = `${this.form.date}T23:59:59`;

    const params = new HttpParams()
      .set('from', this.form.from)
      .set('to', this.form.to)
      .set('start', start)
      .set('end', end);

    this.http.post<any[]>(
      'http://localhost:8080/api/flight/search',
      null,
      { params }
    )
    .subscribe({
      next: (res) => {
        this.flights = res;
        this.searched = true;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Failed to fetch flights');
      }
    });
  }

  bookFlight(flightId: string) {
    this.router.navigate(['/book', flightId]);
  }
}
