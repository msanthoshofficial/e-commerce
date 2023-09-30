import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterOutlet } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';


import { routes } from './shell.route';
import { HeaderComponent } from 'src/app/core/header/header.component';
@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule,RouterOutlet,HeaderComponent],
  templateUrl: './shell.component.html',
  styles: [
  ]
})
export class ShellComponent {

}
