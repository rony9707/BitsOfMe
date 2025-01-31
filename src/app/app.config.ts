import { ApplicationConfig, importProvidersFrom, Injectable, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withDebugTracing, withPreloading } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store'; //NGRX STORE
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects'; //NGRX STORE DEV TOOLS FOR CHROME
import { getUserEffect } from './states/getUser/getUser.effects';
import { getUserReducer } from './states/getUser/getUser.reducer';
import * as Hammer from 'hammerjs'; // Import Hammer.js
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule } from '@angular/platform-browser';
import { MyHammerConfig } from './services/hammerjs/hammer.service';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules),withDebugTracing()),
    provideAnimations(),
    importProvidersFrom(HammerModule),
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    provideHttpClient(),
    provideStore(), //NGRX STORE
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideEffects(getUserEffect),
    provideState({ name: 'user', reducer: getUserReducer }),
  ]
};
