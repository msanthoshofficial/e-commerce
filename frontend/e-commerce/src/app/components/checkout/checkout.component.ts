import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import {
  StripePaymentElementComponent,
  NgxStripeModule,
  injectStripe,
} from 'ngx-stripe';
import { StripeElementsOptions, PaymentIntent } from '@stripe/stripe-js';
import { DataService } from 'src/app/services/data/data.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { LoaderComponent } from '../loader/loader.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxStripeModule,
    InputTextModule,
    ButtonModule,
    LoaderComponent,
    ToastModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [HttpClient, MessageService],
})
export class CheckoutComponent implements OnInit {
  loaded = false;
  stripe = injectStripe(
    'pk_test_51O1liaSENN4SVfayOpl3y094x9wkvXDdMaVNpjurXkCx1bve8iP021uvWhtbiybD4oABRr0op8E1pQfisvwEWhsB00wgCFFBOQ'
  );
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;
  @Input() amount = 0;
  @Input() products: string[] = [];
  @Input() id = '';
  @Output() checkedout = new EventEmitter<boolean>();

  paymentElementForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    address: [''],
    zipcode: [''],
    city: [''],
    amount: [2500, [Validators.required]],
  });

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  paying = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.createPaymentIntent(this.amount, this.products, this.id).subscribe(
      (res) => {
        const { pi } = res;
        this.elementsOptions.clientSecret = pi.client_secret!;
        this.loaded = true;
      }
    );
  }

  pay() {
    this.loaded = false;
    if (this.paymentElementForm.valid) {
      this.paying = true;
      this.stripe
        .confirmPayment({
          elements: this.paymentElement.elements,
          confirmParams: {
            payment_method_data: {
              billing_details: {
                name: this.paymentElementForm.get('name')!.value!,
                email: this.paymentElementForm.get('email')!.value!,
                address: {
                  line1: this.paymentElementForm.get('address')!.value || '',
                  postal_code:
                    this.paymentElementForm.get('zipcode')!.value || '',
                  city: this.paymentElementForm.get('city')!.value || '',
                },
              },
            },
          },
          redirect: 'if_required',
        })
        .subscribe((result) => {
          this.paying = false;
          this.loaded = true;
          if (result.error) {
            this.messageService.add({
              severity: 'error',
              summary: 'Payment Error',
              detail: 'Error Please Retry',
            });
          } else {
            if (result.paymentIntent.status === 'succeeded') {
              setTimeout(() => {
                this.dataService.emitCartCountUpdated();
                this.loaded = true;
                this.messageService.add({
                  severity: 'success',
                  summary: 'Payment Successful',
                  detail: 'Order Placed Successfully',
                });
                this.checkedout.emit(true);
              }, 3000);
            }
          }
          this.paymentElementForm.reset();
        });
    } else {
      this.loaded = true;
    }
  }

  private createPaymentIntent(
    amount: number,
    product: Array<String>,
    id: String
  ) {
    return this.dataService.createPaymentIntent(amount, product, id);
  }
}
