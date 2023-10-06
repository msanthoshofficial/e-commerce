import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AvatarModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  profilePicture =
    'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png';
  user: any = {};
  items: any;
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user')!);
    this.profilePicture = `data:${this.user.content_type};base64,${this.user.profile_picture}`;
    this.items = [
      {
        label: 'Hi, ' + this.user.username,
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => {},
          },
        ],
      },
      {
        label: 'Navigate',
        items: [
          {
            label: 'Admin',
            icon: 'pi pi-spin pi-cog',
            url: 'http://angular.io',
          },
          {
            label: 'Seller',
            icon: 'pi pi-shopping-bag',
            routerLink: '/fileupload',
          },
          {
            label: '<span style="color:red">Logout</span>',

            escape: false,
            icon: 'pi pi-sign-out',
            routerLink: '/fileupload',
            iconClass: 'logout-icon',
          },
        ],
      },
    ];
  }
}
