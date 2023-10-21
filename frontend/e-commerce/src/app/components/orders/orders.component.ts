import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DataService } from 'src/app/services/data/data.service';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TimelineModule, TagModule],
  templateUrl: './orders.component.html',
  styles: [],
})
export class OrdersComponent implements OnInit {
  orders: [] = [];
  selectedOrder: any;
  tracking = false;
  events = [
    {
      status: 'Ordered',
      icon: 'pi pi-shopping-cart',
      color: '#9C27B0',
      image: 'game-controller.jpg',
    },
    {
      status: 'Processing',
      icon: 'pi pi-cog',
      color: '#673AB7',
    },
    {
      status: 'Shipped',
      icon: 'pi pi-truck',
      color: '#FF9800',
    },
    {
      status: 'Delivered',
      date: '16/10/2020 10:00',
      icon: 'pi pi-check',
      color: '#607D8B',
    },
  ];
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.dataService.getMyOrders().subscribe((data: any) => {
      console.log(data);
      this.orders = data;
    });
  }
  track(order: any) {
    this.selectedOrder = order;
    this.tracking = true;
  }
}
