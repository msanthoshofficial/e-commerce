import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from 'src/app/components/user-management/user-management.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, UserManagementComponent],
  templateUrl: './admin.component.html',
  styles: [],
})
export class AdminComponent {}
