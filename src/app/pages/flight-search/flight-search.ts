import { Component } from '@angular/core';
import { FlightService } from '../../services/flight';


@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {


  form = {
    source: '',
    destination: '',
    date: ''
  };


  flights: any[] = [];

 
  constructor(private flightService: FlightService) {}

  search() {
    this.flightService.search(this.form).subscribe({
      next: (data: any[]) => {
        this.flights = data;
      },
      error: (err) => {
        console.error(err);
        alert('Failed to fetch flights');
      }
    });
  }
}
