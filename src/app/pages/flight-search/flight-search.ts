import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flight-search.html',
  styleUrls: ['./flight-search.css']
})
export class FlightSearchComponent {

  form = {
    source: '',
    destination: '',
    date: ''
  };

  flights: any[] = [];
  searched = false;

  constructor(private http: HttpClient) {}

  searchFlights() {
    const url = `http://localhost:8080/api/flight/search
      ?source=${this.form.source}
      &destination=${this.form.destination}
      &date=${this.form.date}`;

    this.http.get<any[]>(url).subscribe({
      next: res => {
        this.flights = res;
        this.searched = true;
      },
      error: err => {
        alert('Failed to fetch flights');
        console.error(err);
      }
    });
  }
}
