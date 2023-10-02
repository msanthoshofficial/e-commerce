import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly  api_url = 'http://localhost:8000/api/'

  constructor(private http: HttpClient) { }
  login(email: string, password: string) {
    return this.http.post(this.api_url+'login', {email:email,password:password},{ withCredentials: true })
  }
  register(email: string, password: string) {
    console.log(email, password);
  }
  isAuthenticated(): boolean {
    return true;
  }

}
