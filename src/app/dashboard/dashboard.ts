import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  bookings: any[] = [];
  filteredBookings: any[] = [];

  loading = true;

  email!: string;
  token!: string;

  // filter state
  filter: 'all' | 'confirmed' | 'cancelled' = 'all';

  // dialog state
  showConfirmDialog = false;
  selectedPnr: string | null = null;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';
    this.token = localStorage.getItem('token') || '';

    if (!this.email || !this.token || this.email === 'null') {
      this.showErrorToast('Invalid session. Please login again.');
      return;
    }

    this.loadBookings();
  }

  loadBookings() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    this.http.get<any[]>(
      `http://localhost:8080/api/booking/history/${encodeURIComponent(this.email)}`,
      { headers }
    ).subscribe({
      next: (res) => {
        this.bookings = res || [];
        this.applyFilter(); 
        this.loading = false;
      },
      error: () => {
        this.showErrorToast('Failed to load booking history');
        this.loading = false;
      }
    });
  }

  //filter logic
  applyFilter() {
    let data = [...this.bookings];

    //confirmed first, cancelled later (initial order)
    data.sort((a, b) => Number(a.cancelled) - Number(b.cancelled));

    if (this.filter === 'confirmed') {
      this.filteredBookings = data.filter(b => !b.cancelled);
    } else if (this.filter === 'cancelled') {
      this.filteredBookings = data.filter(b => b.cancelled);
    } else {
      this.filteredBookings = data;
    }
  }

  setFilter(value: 'all' | 'confirmed' | 'cancelled') {
    this.filter = value;
    this.applyFilter();
  }

  // dialog
  openCancelDialog(pnr: string) {
    this.selectedPnr = pnr;
    this.showConfirmDialog = true;
  }

  closeDialog() {
    this.showConfirmDialog = false;
    this.selectedPnr = null;
  }

  confirmCancel() {
    if (!this.selectedPnr) return;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    this.http.delete(
      `http://localhost:8080/api/booking/cancel/${this.selectedPnr}`,
      {
        headers,
        observe: 'response'
      }
    ).subscribe({
      next: (res) => {
        if (res.status === 204) {
          this.showSuccessToast('Booking cancelled successfully');
          this.loadBookings(); // reload & reapply filter
        }
        this.closeDialog();
      },
      error: (err) => {
        if (err.status === 400) {
          this.showErrorToast(err.error || 'Cannot cancel within 24 hours of departure');
        } else {
          this.showErrorToast('Failed to cancel booking');
        }
        this.closeDialog();
      }
    });
  }

  // toasts
  showSuccessToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['success-toast']
    });
  }

  showErrorToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['error-toast']
    });
  }
}
