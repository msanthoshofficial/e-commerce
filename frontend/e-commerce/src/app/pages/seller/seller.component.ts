import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from '../../components/product-management/product-management.component';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [CommonModule, ProductManagementComponent],
  templateUrl: './seller.component.html',
  styles: [],
})
export class SellerComponent {}
