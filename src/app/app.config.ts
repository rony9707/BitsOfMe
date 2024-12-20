import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withDebugTracing, withPreloading } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { provideState, provideStore } from '@ngrx/store'; //NGRX STORE
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects'; //NGRX STORE DEV TOOLS FOR CHROME
import { getUserEffect } from './states/getUser/getUser.effects';
import { getUserReducer } from './states/getUser/getUser.reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules),
      // withDebugTracing()
    ),
    provideAnimations(),
    provideHttpClient(),
    provideStore(), //NGRX STORE
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideEffects(getUserEffect),
    provideState({ name: 'user', reducer: getUserReducer }),
  ]
};
