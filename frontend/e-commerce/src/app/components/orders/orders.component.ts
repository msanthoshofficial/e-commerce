import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DataService } from 'src/app/services/data/data.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './orders.component.html',
  styles: [],
})
export class OrdersComponent implements OnInit {
  orders = [];
  constructor(private dataService: DataService) {}
  ngOnInit(): void {}
}
