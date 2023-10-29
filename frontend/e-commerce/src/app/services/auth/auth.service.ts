import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environment/env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly api_url = environment.api;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post(
      this.api_url + 'login',
      { email: email, password: password },
      { withCredentials: true }
    );
  }

  isAuthenticated(url: any): any {
    return this.http
      .get(this.api_url + 'login', { withCredentials: true })
      .pipe(
        map((auth: any) => {
          if (url == '/app/admin') {
            return auth.message == 'Authenticated' && auth.role == 'admin';
          } else if (url == '/app/seller') {
            return (
              auth.message == 'Authenticated' &&
              (auth.role == 'seller' || auth.role == 'admin')
            );
          } else {
            return auth.message == 'Authenticated';
          }
        }),
        catchError((err) => {
          this.router.navigate(['/login']);
          return throwError(() => false);
        })
      );
  }
}
