import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    PasswordModule,
    ToastModule,
    InputTextareaModule,
    InputMaskModule,
    FileUploadModule,
  ],
  providers: [AuthService, MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  value: any;
  imageUrl: string | null = null;
  formToggled: boolean = false;
  loginform = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  registerform = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(13),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    profileImage: new FormControl(['']),
  });

  login() {
    this.authService
      .login(this.loginform.value.email!, this.loginform.value.password!)
      .subscribe((res: loginResponse) => {
        if (res.message == 'Login successful') {
          this.router.navigate(['/app/products']);
        }
        else{
          this.messageService.add({
            severity: 'error',
            summary: 'Auth Error',
            detail: 'Email or Password is incorrect',
          });
        }
      },(err)=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Auth Error',
          detail: 'Email or Password is incorrect',
        });
      });
  }

  register() {
    console.log(this.registerform.value);
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];

    if (file) {
      const maxSize = 1024 * 1024; // 1 MB
      if (file.size > maxSize) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Size Error',
          detail: 'Image size should not exceed 1 MB',
        })
        this.fileInput.nativeElement.value = ''; // Clear the input
        return;
      }
      // Display preview
      const reader = new FileReader();
      reader.onload = (e) => {
        // Ensure that e.target.result is a string
        if (typeof e.target?.result === 'string') {
          this.imageUrl = e.target.result;
        }
      };

      // Read the image as a data URL
      reader.readAsDataURL(file);
      this.registerform.get('profileImage')?.setValue(file);
    }
  }

  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  toggleForm(status: boolean) {
    this.formToggled = status;
  }
}
export type loginResponse = {
  message?: string;
};
