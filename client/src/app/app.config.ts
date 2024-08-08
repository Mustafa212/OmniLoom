import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideLottieOptions({
      player:()=>player,
    }),
    provideHttpClient(withInterceptors([])),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right',
      
    }), provideAnimationsAsync(),

  ]
};
