import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  profilePicture =
    'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png';
  ngOnInit() {
    let user = JSON.parse(sessionStorage.getItem('user')!);
    this.profilePicture = `data:${user.content_type};base64,${user.profile_picture}`;
  }
}
