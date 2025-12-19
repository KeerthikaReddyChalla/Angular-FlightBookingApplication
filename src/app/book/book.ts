import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book.html',
  styleUrls: ['./book.css']
})
export class BookComponent {

  flightId!: string;

  name = '';
  email = '';
  meal = 'Veg';

  passengerCount = 1;

  passengers: any[] = [
    { name: '', gender: '', age: null }
  ];

  seatNumbers: string[] = [];

  //booking result
  bookingSuccess = false;
  pnr = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.flightId = this.route.snapshot.paramMap.get('flightId')!;
    console.log('Flight ID:', this.flightId);
  }

  updatePassengers() {
    this.passengers = [];
    for (let i = 0; i < this.passengerCount; i++) {
      this.passengers.push({
        name: '',
        gender: '',
        age: null
      });
    }
  }

  bookTicket() {

    if (!this.name || !this.email) {
      this.errorMessage = 'Name and Email are required';
      return;
    }

    const bookingPayload = {
      name: this.name,
      email: this.email,
      seats: this.passengerCount,
      passengers: this.passengers,
      meal: this.meal,
      seatNumbers: this.seatNumbers
    };

    console.log('Sending payload:', bookingPayload);

    this.http.post<any>(
      `http://localhost:8080/api/booking/flight/${this.flightId}`,
      bookingPayload
    ).subscribe({
      next: (res) => {
        this.bookingSuccess = true;
        this.pnr = res.pnr;   //backend-generated PNR
        this.errorMessage = '';
        console.log('Booking response:', res);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Booking failed. Please try again.';
        this.bookingSuccess = false;
      }
    });
  }
}
