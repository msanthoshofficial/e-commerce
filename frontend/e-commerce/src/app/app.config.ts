import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNgxStripe } from 'ngx-stripe';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    provideNgxStripe(
      'pk_test_51O1liaSENN4SVfayOpl3y094x9wkvXDdMaVNpjurXkCx1bve8iP021uvWhtbiybD4oABRr0op8E1pQfisvwEWhsB00wgCFFBOQ'
    ),
  ],
};
