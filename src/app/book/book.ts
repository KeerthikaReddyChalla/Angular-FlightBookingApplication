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
    const bookingPayload = {
      name: this.name,
      email: this.email,
      seats: this.passengerCount,
      passengers: this.passengers,
      meal: this.meal,
      seatNumbers: this.seatNumbers
    };
    if (!this.name || !this.email) {
  alert('Name and Email are required');
  return;
}


    console.log('Sending payload:', bookingPayload);

    this.http.post(
      `http://localhost:8080/api/booking/flight/${this.flightId}`,
      bookingPayload
    ).subscribe({
      next: (res) => {
        alert('Booking successful');
        console.log(res);
      },
      error: (err) => {
        console.error(err);
        alert('Booking failed');
      }
    });
  }
}
