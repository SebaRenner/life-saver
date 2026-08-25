import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.backendUrl}/auth`;

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }
}
