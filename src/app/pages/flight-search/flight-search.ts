import { Component } from '@angular/core';
import { FlightService } from '../../services/flight';

@Component({
  selector: 'app-flight-search',
  imports: [],
  templateUrl: './flight-search.html',
  styleUrl: './flight-search.css',
})
export class FlightSearchComponent {
search() {
  this.flightService.search(this.form).subscribe({
    next: data => this.flights = data
  });
}

}
