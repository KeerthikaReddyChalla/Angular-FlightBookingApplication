import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { FlightSearchComponent } from './pages/flight-search/flight-search';
import { AuthGuard } from './guards/auth-guard';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
  path: 'flights',
  loadComponent: () =>
    import('./pages/flight-search/flight-search')
      .then(m => m.FlightSearchComponent)
},

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
