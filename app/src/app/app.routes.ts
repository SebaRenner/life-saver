import { Routes } from '@angular/router';
import { EmergencyInfo } from './features/emergency-info/emergency-info';
import { Login } from './features/login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: EmergencyInfo,
    canActivate: [authGuard],
  },
  {
    path: 'edit',
    component: EmergencyInfo,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
