import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DataService } from 'src/app/services/data/data.service';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ButtonModule, RatingModule, FormsModule],
  templateUrl: './product.component.html',
  styles: [],
})
export class ProductComponent {
  @Input() product: any;
  constructor(private dataService: DataService) {}
  addToCart(productId: String) {
    this.dataService.addToCart(productId).subscribe((data: any) => {
      this.dataService.emitCartCountUpdated();
    });
  }
}
