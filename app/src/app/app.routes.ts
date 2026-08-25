import { Routes } from '@angular/router';
import { EmergencyInfo } from './features/emergency-info/emergency-info';
import { Login } from './features/login/login';

export const routes: Routes = [
  { path: '', component: EmergencyInfo },
  { path: 'login', component: Login },
  { path: 'edit', component: EmergencyInfo },
  { path: '**', component: EmergencyInfo },
];
