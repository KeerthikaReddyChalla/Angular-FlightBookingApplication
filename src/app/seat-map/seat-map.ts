import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-seat-map',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './seat-map.html',
  styleUrls: ['./seat-map.css']
})
export class SeatMapComponent implements OnChanges {

  @Input() flightId!: string;
  @Output() seatsSelected = new EventEmitter<string[]>();

  seats: any[] = [];
  selectedSeats: string[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef // 🔥 FIX
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flightId'] && this.flightId) {
      this.loadSeats();
    }
  }

  loadSeats() {
    this.http.get<any[]>(
      `http://localhost:8080/api/flight/airline/inventory/${this.flightId}/seats`
    ).subscribe({
      next: (res) => {
        console.log('Seats loaded:', res);
        this.seats = res;

        // 🔥 FORCE UI REFRESH
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load seats', err);
      }
    });
  }

  toggleSeat(seat: any) {
    if (seat.booked) return;

    if (this.selectedSeats.includes(seat.seatNumber)) {
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat.seatNumber);
    } else {
      this.selectedSeats.push(seat.seatNumber);
    }

    this.seatsSelected.emit(this.selectedSeats);
  }
}
