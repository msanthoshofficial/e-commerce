import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'seller' },
  {
    path: 'products',
    loadComponent: () =>
      import('../products/products.component').then((c) => c.ProductsComponent),
  },
  {
    path: 'seller',
    loadComponent: () =>
      import('../seller/seller.component').then((c) => c.SellerComponent),
  },
];
