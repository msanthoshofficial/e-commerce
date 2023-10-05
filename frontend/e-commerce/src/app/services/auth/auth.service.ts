import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly api_url = 'http://localhost:8000/api/';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post(
      this.api_url + 'login',
      { email: email, password: password },
      { withCredentials: true }
    );
  }

  register(email: string, password: string) {
    console.log(email, password);
  }

  isAuthenticated(): any {
    return this.http
      .get(this.api_url + 'login', { withCredentials: true })
      .pipe(
        map((auth: any) => {
          return auth.message == 'Authenticated';
        }),
        catchError((err) => {
          this.router.navigate(['/login']);
          return throwError(() => false);
        })
      );
  }
}
