import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  bookings: any[] = [];
  loading = true;
  email: string | null = null;
  token: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    this.token = localStorage.getItem('token');

    if (!this.email || !this.token || this.email === 'null') {
      alert('Invalid session. Please login again.');
      return;
    }

    this.loadBookings();
  }

  loadBookings() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    this.http.get<any[]>(
      `http://localhost:8080/api/booking/history/${encodeURIComponent(this.email!)}`,
      { headers }
    ).subscribe({
      next: (res) => {
        this.bookings = res;
        this.loading = false;
      },
      error: () => {
        alert('Failed to load booking history');
        this.loading = false;
      }
    });
  }

  cancelBooking(pnr: string) {
    if (!confirm(`Are you sure you want to cancel booking PNR: ${pnr}?`)) {
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    this.http.delete(
      `http://localhost:8080/api/booking/cancel/${pnr}`,
      { headers }
    ).subscribe({
      next: () => {
        // update UI locally
        const booking = this.bookings.find(b => b.pnr === pnr);
        if (booking) {
          booking.cancelled = true;
        }
        alert('Booking cancelled successfully');
      },
      error: (err) => {
        console.error(err);

        if (err.status === 400) {
          alert('Cannot cancel ticket within 24 hours of departure');
        } else {
          alert('Failed to cancel booking');
        }
      }
    });
  }
}
