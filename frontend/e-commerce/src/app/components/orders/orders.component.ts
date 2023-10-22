import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DataService } from 'src/app/services/data/data.service';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TimelineModule,
    TagModule,
    RatingModule,
    FormsModule,
  ],
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
  selectedEvent: any;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.dataService.getMyOrders().subscribe((data: any) => {
      this.orders = data;
    });
  }
  track(order: any) {
    this.selectedOrder = order;
    const index = this.events.findIndex(
      (event) => event.status === this.selectedOrder.order_status
    );
    this.selectedEvent = index !== -1 ? this.events.slice(0, index + 1) : [];
    this.tracking = true;
  }
  rated(id: string, event: any) {
    let rating = event.value ? event.value : 0;
    this.dataService.addRating(id, rating).subscribe((data: any) => {
      this.getOrders();
    });
  }
}
