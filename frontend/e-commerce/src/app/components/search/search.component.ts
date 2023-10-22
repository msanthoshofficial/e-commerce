import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    DialogModule,
    ProductComponent,
  ],
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  @Input() searchText: string = '';
  products = JSON.parse(sessionStorage.getItem('Products')!);
  showproduct = false;
  filteredProducts: any;
  selectedProduct: any;
  ngOnInit(): void {}
  filterProducts() {
    if (!this.searchText) {
      this.selectedProduct = undefined;
    }
    this.filteredProducts = this.products
      .map((product: any) => ({
        ...product,
        relevance: this.calculateRelevance(product, this.searchText),
      }))
      .filter((product: any) => product.relevance > 0)
      .sort((a: any, b: any) => b.relevance - a.relevance)
      .slice(0, 5); // Get only the top 5 matches
  }
  private calculateRelevance(product: any, searchText: string): number {
    // Customize this logic based on your specific use case
    searchText = searchText.toLowerCase();
    const nameRelevance = product.name.toLowerCase().includes(searchText)
      ? 4
      : 0;
    const descriptionRelevance = product.description
      ?.toLowerCase()
      .includes(searchText)
      ? 3
      : 0;
    const ratingRelevance = product.rating.toString().includes(searchText)
      ? 2
      : 0;
    const priceRelevance = product.price.toString().includes(searchText)
      ? 1
      : 0;

    return (
      nameRelevance + descriptionRelevance + priceRelevance + ratingRelevance
    );
  }
}
