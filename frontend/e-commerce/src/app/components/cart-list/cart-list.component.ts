import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DataService } from 'src/app/services/data/data.service';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    CheckoutComponent,
  ],
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  constructor(private dataService: DataService) {}
  checkout = false;
  loading = true;
  products: any = [];
  product_ref: any = [];
  cartSum = 0;
  ngOnInit(): void {
    this.getCartItems();
    this.dataService.cartCountUpdated.subscribe((data: any) => {
      this.getCartItems();
    });
  }
  getCartItems() {
    this.dataService.getCartProducts().subscribe(
      (data: any) => {
        this.products = data.cartItems;
        this.cartSum = 0;
        this.products.forEach((item: any) => {
          this.product_ref.push({
            product_id: item.product_id,
            seller_id: item.productDetails.seller_id,
            quantity: item.quantity,
          });
          this.cartSum += item.productDetails.price * item.quantity;
        });
        this.loading = false;
      },
      (err) => {
        this.products = [];
        this.cartSum = 0;
        this.product_ref = [];
      }
    );
  }
  increment(product_id: String) {
    this.dataService.addToCart(product_id).subscribe((res: any) => {
      this.dataService.emitCartCountUpdated();
    });
  }
  decrement(product_id: String) {
    this.dataService.reduceQuantity(product_id).subscribe((res: any) => {
      this.dataService.emitCartCountUpdated();
    });
  }
  deleteFromCart(product_id: String) {
    this.dataService.deleteFromCart(product_id).subscribe((res: any) => {
      this.dataService.emitCartCountUpdated();
    });
  }
}
