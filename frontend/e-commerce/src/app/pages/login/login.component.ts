import { Component } from '@angular/core';
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
    FileUploadModule
  ],
  providers: [AuthService, MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  
  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {
    
  }
  value: any;
  formToggled: boolean = false;
  loginform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  registerform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  
  login() {
    this.authService.login(
      this.loginform.value.email!,
      this.loginform.value.password!
    ).subscribe((res:loginResponse)=>{
      
      if(res.message == "Login successful"){
        this.router.navigate(['/app/products']);
      }
    });
    this.messageService.add({ severity: 'error', summary: 'Auth Error', detail: 'Email or Password is incorrect' });
  }
  register() {
    console.log(this.registerform.value);
  }
  toggleForm(status: boolean) {
    this.formToggled = status;
    console.log(this.formToggled);
  }
}
export type loginResponse = {
  message?: string;
};