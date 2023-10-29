import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/env';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly api_url = environment.api;
  cartCountUpdated = new EventEmitter<Object>();
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
  getAllUsers() {
    return this.http.get(this.api_url + 'user/all', {
      withCredentials: true,
    });
  }
  updateUserRole(id: string, role: string) {
    return this.http.post(
      this.api_url + 'user/role/' + id,
      { role },
      {
        withCredentials: true,
      }
    );
  }
  deleteUser(id: string) {
    return this.http.delete(this.api_url + 'user/' + id, {
      withCredentials: true,
    });
  }
  getProducts() {
    return this.http.get(this.api_url + 'product', {
      withCredentials: true,
    });
  }
  getMyProducts() {
    return this.http.get(this.api_url + 'product/my-products', {
      withCredentials: true,
    });
  }
  addProduct(formData: FormData) {
    return this.http.post(this.api_url + 'product', formData, {
      withCredentials: true,
    });
  }
  updateProduct(formData: FormData, id: string) {
    return this.http.put(this.api_url + 'product/' + id, formData, {
      withCredentials: true,
    });
  }
  getCartCount() {
    return this.http.get(this.api_url + 'cart/count', {
      withCredentials: true,
    });
  }
  getCartProducts() {
    return this.http.get(this.api_url + 'cart', {
      withCredentials: true,
    });
  }
  addToCart(productId: String) {
    return this.http.post(
      this.api_url + 'cart',
      { productId },
      {
        withCredentials: true,
      }
    );
  }
  reduceQuantity(productId: String) {
    return this.http.post(
      this.api_url + 'cart/reduce',
      { productId },
      {
        withCredentials: true,
      }
    );
  }
  deleteFromCart(productId: String) {
    return this.http.delete(this.api_url + 'cart/' + productId, {
      withCredentials: true,
    });
  }

  emitCartCountUpdated() {
    this.cartCountUpdated.emit({ message: 'Cart Updated' });
  }

  createPaymentIntent(
    amount: number,
    products: Array<String>,
    paymentMethodId: String
  ) {
    return this.http.post<any>(
      `${this.api_url}payment/create-payment-intent`,
      { amount, products, paymentMethodId },
      { withCredentials: true }
    );
  }

  getOrdersCount() {
    return this.http.get(this.api_url + 'order/count', {
      withCredentials: true,
    });
  }

  getMyOrders() {
    return this.http.get(this.api_url + 'order', {
      withCredentials: true,
    });
  }
  getSellerOrders() {
    return this.http.get(this.api_url + 'order/seller', {
      withCredentials: true,
    });
  }
  updateOrderStatus(orderId: String, status: String) {
    return this.http.post(
      this.api_url + 'order/' + orderId,
      { status },
      {
        withCredentials: true,
      }
    );
  }
  addRating(id: string, rating: number) {
    return this.http.put(
      this.api_url + 'rating/' + id,
      { rating },
      {
        withCredentials: true,
      }
    );
  }
}
