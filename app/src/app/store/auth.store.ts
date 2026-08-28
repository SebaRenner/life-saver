import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { CachingService } from '../services/caching.service';
import { inject } from '@angular/core';

const AUTH_LOCAL_STORAGE_KEY = 'auth_state';

export type AuthState = {
  isAuthenticated: boolean;
  userId: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState((cachingService = inject(CachingService)) => {
    const cachedState = cachingService.get<AuthState>(AUTH_LOCAL_STORAGE_KEY);
    return cachedState ?? initialState;
  }),
  withMethods((store, cachingService = inject(CachingService)) => ({
    login(userId: string) {
      patchState(store, { isAuthenticated: true, userId });
      cachingService.set(AUTH_LOCAL_STORAGE_KEY, { isAuthenticated: true, userId });
    },
    logout() {
      patchState(store, initialState);
      cachingService.remove(AUTH_LOCAL_STORAGE_KEY);
    },
  })),
);
