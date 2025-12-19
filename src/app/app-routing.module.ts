import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { FlightSearchComponent } from './pages/flight-search/flight-search';
import { AuthGuard } from './guards/auth-guard';
import { BookComponent } from './book/book';
import { DashboardComponent } from './dashboard/dashboard';
export const routes: Routes = [
  { path: 'book', component: BookComponent },
  {
    path: 'dashboard', component: DashboardComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
  path: 'flights',
  loadComponent: () =>
    import('./pages/flight-search/flight-search')
      .then(m => m.FlightSearchComponent)
},

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
  path: 'book/:flightId',
  loadComponent: () =>
    import('./book/book').then(m => m.BookComponent)
}

];
