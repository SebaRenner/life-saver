import { Routes } from '@angular/router';
import { EmergencyInfoEditComponent } from './features/emergency-info-edit/emergency-info-edit.component';
import { EmergencyInfoViewComponent } from './features/emergency-info-view/emergency-info-view.component';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'edit', component: EmergencyInfoEditComponent, canActivate: [authGuard] },
  { path: ':id', component: EmergencyInfoViewComponent },
  { path: '', redirectTo: 'edit', pathMatch: 'full' },
  { path: '**', redirectTo: 'edit' },
];
