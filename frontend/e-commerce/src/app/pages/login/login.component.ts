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
import { InputSwitchModule } from 'primeng/inputswitch';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

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
    InputSwitchModule,
    LoaderComponent,
  ],
  providers: [AuthService, MessageService, DataService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private dataService: DataService
  ) {}
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  value: any;
  imageUrl: string | null = null;
  formToggled: boolean = false;
  seller = false;
  loading = false;
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
      Validators.minLength(14),
      Validators.maxLength(14),
    ]),
    seller: new FormControl(false, [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    profile_picture: new FormControl(['']),
  });

  login() {
    this.loading = true;
    this.authService
      .login(this.loginform.value.email!, this.loginform.value.password!)
      .subscribe(
        (res: loginResponse) => {
          this.loading = false;
          if (res.message == 'Login successful') {
            this.dataService.userProfile().subscribe((res) => {
              sessionStorage.setItem('user', JSON.stringify(res));
              this.router.navigate(['/app/products']);
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Auth Error',
              detail: 'Email or Password is incorrect',
            });
          }
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Auth Error',
            detail: 'Email or Password is incorrect',
          });
          this.loading = false;
        }
      );
  }

  register() {
    this.loading = true;
    const formData = new FormData();
    formData.append('email', this.registerform.value.email!);
    formData.append('address', this.registerform.value.address!);
    formData.append('phone', this.registerform.value.phone!);
    formData.append(
      'role',
      this.registerform.value.seller! ? 'seller' : 'customer'
    );
    formData.append('password', this.registerform.value.password!);
    const profile_picture = this.registerform.get('profile_picture')?.value;
    if (profile_picture instanceof File) {
      formData.append('profile_picture', profile_picture);
    }
    this.dataService.registerUser(formData).subscribe(
      (res: loginResponse) => {
        this.clearFileInput();
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'User Registration Successful',
          detail: 'User registered successfully',
        });
        this.toggleForm(false);
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'User Registration Error',
          detail: "Can't register user",
        });
        this.clearFileInput();
        this.loading = false;
      }
    );
    this.clearFileInput();
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
        });
        this.replaceFileInput(); // Clear the input
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
      this.registerform.get('profile_picture')!.setValue(file);
      this.replaceFileInput();
    }
  }

  replaceFileInput(): void {
    const parent = this.fileInput.nativeElement.parentNode;
    if (!parent) return;
    // Remove the existing input
    parent.removeChild(this.fileInput.nativeElement);

    // Create a new input
    const newFileInput = document.createElement('input');
    newFileInput.type = 'file';
    newFileInput.accept = 'image/*';
    newFileInput.style.display = 'none';

    // Add the new input
    parent.appendChild(newFileInput);

    // Add event listener to the new input
    newFileInput.addEventListener('change', (event: Event) =>
      this.onImageUpload(event)
    );

    // Update the reference to the new input
    this.fileInput.nativeElement = newFileInput;
  }

  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  clearFileInput(): void {
    this.fileInput.nativeElement.value = '';
    this.registerform.reset();
  }

  toggleForm(status: boolean) {
    this.formToggled = status;
  }
}
export type loginResponse = {
  message?: string;
  user?: Object;
};
