import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-inventory.html',
  styleUrls: ['./admin-inventory.css']
})
export class AdminInventoryComponent implements OnInit {

  isAdmin = false;
  token: string | null = null;

  inventory = {
    airlineName: '',
    airlineLogo: '',
    fromPlace: '',
    toPlace: '',
    departure: '',
    arrival: '',
    price: 0,
    availableSeats: 0,
    oneWay: true
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.isAdmin = localStorage.getItem('role') === 'ROLE_ADMIN';
  }

  addInventory() {
    if (!this.isAdmin || !this.token) {
      alert('Unauthorized');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.post(
      'http://localhost:8080/api/flight/airline/inventory/add',
      this.inventory,
      { headers }
    ).subscribe({
      next: () => {
        this.snackBar.open(
      'Inventory added successfully',
      'Close',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['success-toast']
      }
    );
      },
      error: (err) => {
        this.snackBar.open(
      'Failed to add inventory',
      'Close',
      {
        duration: 3500,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['error-toast']
      }
    );
      }
    });
  }

  resetForm() {
    this.inventory = {
      airlineName: '',
      airlineLogo: '',
      fromPlace: '',
      toPlace: '',
      departure: '',
      arrival: '',
      price: 0,
      availableSeats: 0,
      oneWay: true
    };
  }
}
