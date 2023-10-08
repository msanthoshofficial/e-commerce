import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './cart-list.component.html',
  styles: [],
})
export class CartListComponent implements OnInit {
  constructor(private dataService: DataService) {}
  products = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
  ];
  ngOnInit(): void {
    this.dataService.getCartProducts().subscribe((data) => {
      console.log(data);
    });
  }
}
