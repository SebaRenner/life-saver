import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  return authStore.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
