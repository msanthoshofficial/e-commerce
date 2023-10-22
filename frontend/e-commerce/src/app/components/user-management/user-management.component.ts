import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DataService } from 'src/app/services/data/data.service';
import { ButtonModule } from 'primeng/button';

import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
  ],
  providers: [MessageService],
  templateUrl: './user-management.component.html',
  styles: [],
})
export class UserManagementComponent implements OnInit {
  users: [] = [];
  roles = [
    { label: 'customer', value: 'customer' },
    { label: 'seller', value: 'seller' },
    { label: 'admin', value: 'admin' },
  ];
  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.dataService.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  onRowEditSave(id: any, role: any) {
    this.dataService.updateUserRole(id, role).subscribe((data: any) => {
      if (data) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User role updated successfully',
        });
      }
      this.getAllUsers();
    });
  }
  deleteUser(id: string) {
    this.dataService.deleteUser(id).subscribe((data: any) => {
      if (data) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User deleted successfully',
        });
      }
      this.getAllUsers();
    });
  }
}
