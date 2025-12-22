import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventories.html',
  styleUrls: ['./inventories.css']
})
export class InventoriesComponent implements OnInit {

  inventories: any[] = [];
  loading = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>(
      'http://localhost:8080/api/flight/airline/inventory/all'
    ).subscribe({
      next: (res) => {
        this.inventories = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  goToAddInventory() {
    this.router.navigate(['/admin/inventory']);
  }
}
