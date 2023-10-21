import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DataService } from 'src/app/services/data/data.service';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './order-management.component.html',
  styles: [],
})
export class OrderManagementComponent implements OnInit {
  constructor(private dataService: DataService) {}
  orders: [] = [];
  statuses = [
    { label: 'Processing', value: 'Processing' },
    { label: 'Shipped', value: 'Shipped' },
    { label: 'Delivered', value: 'Delivered' },
  ];
  ngOnInit(): void {
    this.getSellerOrders();
  }

  getSellerOrders() {
    this.dataService.getSellerOrders().subscribe((data: any) => {
      this.orders = data;
    });
  }
  onRowEditSave(order_id: any, status: any) {
    this.dataService
      .updateOrderStatus(order_id, status)
      .subscribe((data: any) => {
        this.dataService.emitCartCountUpdated();
      });
  }
}
