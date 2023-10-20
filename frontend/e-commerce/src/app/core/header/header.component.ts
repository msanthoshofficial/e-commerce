import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { Router } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { DataService } from 'src/app/services/data/data.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { CartListComponent } from 'src/app/components/cart-list/cart-list.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    MenuModule,
    BadgeModule,
    OverlayPanelModule,
    CartListComponent,
    DialogModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  profilePicture =
    'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png';
  user: any = {};
  items: any;
  cart_items_count = '0';
  products = [];
  show = false;
  constructor(private router: Router, private dataService: DataService) {}
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
            label: 'Home',
            icon: 'pi pi-shopping-bag',
            command: () => {
              this.router.navigate(['app/products']);
            },
          },
          ...(this.user.role == 'admin'
            ? [
                {
                  label: 'Admin',
                  icon: 'pi pi-spin pi-cog',
                  command: () => {
                    this.router.navigate(['app/admin']);
                  },
                },
              ]
            : []),
          ...(this.user.role == 'admin' || this.user.role == 'seller'
            ? [
                {
                  label: 'Seller',
                  icon: 'pi pi-shopping-bag',
                  command: () => {
                    this.router.navigate(['app/seller']);
                  },
                },
              ]
            : []),
          {
            label: '<span style="color:red">Logout</span>',

            escape: false,
            icon: 'pi pi-sign-out',
            command: () => {
              this.router.navigate(['/login']);
            },
          },
        ],
      },
    ];
    this.getCartCount();
    this.dataService.cartCountUpdated.subscribe((res: any) => {
      this.getCartCount();
    });
  }
  getCartCount() {
    this.dataService.getCartCount().subscribe(
      (res: any) => {
        this.cart_items_count = res.itemCount.toString();
      },
      (err) => {
        this.cart_items_count = '0';
      }
    );
  }
}
