import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  StripePaymentElementComponent,
  NgxStripeModule,
  injectStripe,
} from 'ngx-stripe';
import { StripeElementsOptions, PaymentIntent } from '@stripe/stripe-js';
import { DataService } from 'src/app/services/data/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxStripeModule],
  templateUrl: './checkout.component.html',
  styles: [],
  providers: [HttpClient],
})
export class CheckoutComponent implements OnInit {
  stripe = injectStripe(
    'pk_test_51O1liaSENN4SVfayOpl3y094x9wkvXDdMaVNpjurXkCx1bve8iP021uvWhtbiybD4oABRr0op8E1pQfisvwEWhsB00wgCFFBOQ'
  );
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  paymentElementForm = this.fb.group({
    name: ['John doe', [Validators.required]],
    email: ['support@ngx-stripe.dev', [Validators.required]],
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
    private http: HttpClient,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.createPaymentIntent(
      this.paymentElementForm.get('amount')!.value!
    ).subscribe((pi) => {
      console.log(pi);
      this.elementsOptions.clientSecret = pi.client_secret!;
    });
  }

  pay() {
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
          console.log('Result', result);
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            alert({ success: false, error: result.error.message });
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer
              alert({ success: true });
            }
          }
        });
    } else {
      console.log(this.paymentElementForm);
    }
  }

  private createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.dataService.createPaymentIntent(
      amount,
      'product',
      'pm_card_visa'
    );
  }
}
