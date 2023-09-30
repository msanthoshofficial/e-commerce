import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'', pathMatch: 'full', redirectTo: 'products'},
    {path: 'products',  loadComponent: () => import('../products/products.component').then(c => c.ProductsComponent)},
];