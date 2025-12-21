import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SeatMapComponent } from '../seat-map/seat-map';
import { ViewChild} from '@angular/core';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, FormsModule, SeatMapComponent],
  templateUrl: './book.html',
  styleUrls: ['./book.css']
})
export class BookComponent implements OnInit {

  flightId!: string;

  // auto-filled user info
  email = '';
  name = '';
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
    this.name = localStorage.getItem('name') || '';


    if (!this.email || this.email === 'null') {
      this.errorMessage = 'Session expired. Please login again.';
      this.router.navigate(['/login']);
    }
  }
//   @ViewChild('seatMap') seatMap!: SeatMapComponent;
// ngAfterViewInit() {
//   setTimeout(() => {
//     this.seatMap.loadSeats(this.flightId);
//   });
// }

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
    // this.seatNumbers = this.seatMap.selectedSeats;

    if (this.seatNumbers.length !== this.passengerCount) {
      this.errorMessage = 'Please select seats equal to passenger count';
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
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),           
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
          this.errorMessage = err.error || 'Booking failed';
        } else {
          this.errorMessage = 'Booking failed. Please try again.';
        }
      }
    });
  }
}
