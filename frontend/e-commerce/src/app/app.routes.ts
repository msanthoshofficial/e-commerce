import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./pages/shell/shell.route').then((c) => c.routes),
    loadComponent: () =>
      import('./pages/shell/shell.component').then((c) => c.ShellComponent),
  },
];
