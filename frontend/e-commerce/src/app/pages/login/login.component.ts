import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
  value: any;
  formToggled: boolean = false;
  loginform = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  registerform = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  login() {
    this.authService.login(
      this.loginform.value.email,
      this.loginform.value.password
    );
    this.router.navigate(['/app/products']);
  }
  register() {
    console.log(this.registerform.value);
  }
  toggleForm(status: boolean) {
    this.formToggled = status;
    console.log(this.formToggled);
  }
}