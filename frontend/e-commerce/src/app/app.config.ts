import { ApplicationConfig } from '@angular/core';
import { provideRouter,withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';


import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [ provideAnimations(),provideRouter(routes, withHashLocation()),provideHttpClient()]
};
