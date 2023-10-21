import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from '../../components/product-management/product-management.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { OrderManagementComponent } from 'src/app/components/order-management/order-management.component';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [
    CommonModule,
    ProductManagementComponent,
    TabMenuModule,
    OrderManagementComponent,
  ],
  templateUrl: './seller.component.html',
  styles: [],
})
export class SellerComponent {
  items = [
    { label: 'Products', icon: 'pi pi-fw pi-th-large' },
    { label: 'Orders', icon: 'pi pi-fw pi-book' },
  ];

  activeItem = this.items[0];
  switchTab(event: any) {
    this.activeItem = event;
  }
}
