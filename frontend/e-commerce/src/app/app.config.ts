import { ApplicationConfig } from '@angular/core';
import { provideRouter,withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [ provideAnimations(),provideRouter(routes, withHashLocation())]
};
