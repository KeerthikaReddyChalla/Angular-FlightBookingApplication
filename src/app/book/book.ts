import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book.html',
  styleUrls: ['./book.css']
})
export class BookComponent {

  flightId!: string;

  // logged-in user info
  email = '';

  meal = 'Veg';
  passengerCount = 1;

  passengers: any[] = [
    { name: '', gender: '', age: null }
  ];

  seatNumbers: string[] = [];

  bookingSuccess = false;
  pnr = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.flightId = this.route.snapshot.paramMap.get('flightId')!;
    this.email = localStorage.getItem('email') || '';

    if (!this.email) {
      this.errorMessage = 'Please login again';
      this.router.navigate(['/login']);
    }
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

    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Unauthorized. Please login again.';
      return;
    }

    // basic validation
    for (let p of this.passengers) {
      if (!p.name || !p.gender || !p.age) {
        this.errorMessage = 'Please fill all passenger details';
        return;
      }
    }

    const bookingPayload = {
      email: this.email,               
      seats: this.passengerCount,
      passengers: this.passengers,
      meal: this.meal,
      seatNumbers: this.seatNumbers
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.post<any>(
      `http://localhost:8080/api/booking/flight/${this.flightId}`,
      bookingPayload,
      { headers }
    ).subscribe({
      next: (res) => {
        this.bookingSuccess = true;
        this.pnr = res.pnr;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error(err);
        this.bookingSuccess = false;

        if (err.status === 400) {
          this.errorMessage = err.error;
        } else {
          this.errorMessage = 'Booking failed. Please try again.';
        }
      }
    });
  }
}
