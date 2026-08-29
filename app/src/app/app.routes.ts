import { Routes } from '@angular/router';
import { EmergencyInfoEdit } from './features/emergency-info-edit/emergency-info-edit';
import { EmergencyInfoView } from './features/emergency-info-view/emergency-info-view';
import { Login } from './features/login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'edit', component: EmergencyInfoEdit, canActivate: [authGuard] },
  { path: ':id', component: EmergencyInfoView },
  { path: '', redirectTo: 'edit', pathMatch: 'full' },
  { path: '**', redirectTo: 'edit' },
];
