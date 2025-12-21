import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { FlightSearchComponent } from './pages/flight-search/flight-search';
import { AuthGuard } from './guards/auth-guard';
import { BookComponent } from './book/book';
import { DashboardComponent } from './dashboard/dashboard';
import { HomeComponent } from './pages/home/home';
import { AdminInventoryComponent } from './admin-inventory/admin-inventory';
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
},{
  path: 'admin/inventory',
  component: AdminInventoryComponent
},

  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
  path: 'book/:flightId',
  loadComponent: () =>
    import('./book/book').then(m => m.BookComponent)
}

];
