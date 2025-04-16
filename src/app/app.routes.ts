import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './features/tours/dashboard/dashboard.component';
import { FormComponent } from './features/tours/form/form.component';
import { ClientesComponent } from './features/clientes/clientes/clientes.component';
import { ClienteFormComponent } from './features/clientes/cliente-form/cliente-form.component';
import { ReservasComponent } from './features/reservas/reservas/reservas.component';
import { ReservaFormComponent } from './features/reservas/reserva-form/reserva-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'tours',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'new', component: FormComponent },
      { path: ':id', component: FormComponent }
    ]
  },
  {
    path: 'clientes',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ClientesComponent },
      { path: 'new', component: ClienteFormComponent },
      { path: ':id', component: ClienteFormComponent }
    ]
  },
  {
    path: 'reservas',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ReservasComponent },
      { path: 'new', component: ReservaFormComponent },
      { path: ':id', component: ReservaFormComponent }
    ]
  },  
  { path: '**', redirectTo: 'login' }
];
