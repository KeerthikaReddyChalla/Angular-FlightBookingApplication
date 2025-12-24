import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { FlightSearchComponent } from './pages/flight-search/flight-search';
import { AuthGuard } from './guards/auth-guard';
import { BookComponent } from './book/book';
import { DashboardComponent } from './dashboard/dashboard';
import { HomeComponent } from './pages/home/home';
import { AdminInventoryComponent } from './admin-inventory/admin-inventory';
import { UserProfileComponent } from './user-profile/user-profile';
import { InventoriesComponent } from './inventories/inventories';
import { PasswordGuard } from './guards/password.guard';
import { ForgotPassword } from './forgot-password/forgot-password';
import { ResetPassword } from './reset-password/reset-password';
export const routes: Routes = [
  { path: 'book', component: BookComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [PasswordGuard]},
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
  {
  path: 'profile',
  component: UserProfileComponent
},
{ path: 'forgot-password', component: ForgotPassword },
 { path: 'reset-password', component: ResetPassword },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
  path: 'inventories',
  component: InventoriesComponent
},
  {
  path: 'book/:flightId',
  loadComponent: () =>
    import('./book/book').then(m => m.BookComponent)
}

];
