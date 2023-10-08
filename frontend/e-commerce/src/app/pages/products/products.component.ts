import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    RatingModule,
    FormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}
  products = [];
  ngOnInit(): void {
    this.dataService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

  addToCart(productId: number) {
    this.dataService.addToCart(productId).subscribe((data: any) => {
      console.log(data);
      this.dataService.getCart().subscribe((data: any) => {
        console.log(data);
      });
    });
  }

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
}
