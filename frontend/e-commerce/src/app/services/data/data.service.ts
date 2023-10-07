import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly api_url = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) {}

  registerUser(formData: FormData) {
    return this.http.post(this.api_url + 'user', formData, {
      withCredentials: true,
    });
  }
  userProfile() {
    return this.http.get(this.api_url + 'user/profile', {
      withCredentials: true,
    });
  }
  getProducts() {
    return this.http.get(this.api_url + 'product', {
      withCredentials: true,
    });
  }
}
