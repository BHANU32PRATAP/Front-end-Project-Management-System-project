import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apService = inject(ApiService)
  private http = inject(HttpClient)
  apiUrl = this.apService.apiUrl

  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData)
  }

  onLogin(loginData: any) {
    return this.http.post(`${this.apiUrl}/login`, loginData)
  }

}
