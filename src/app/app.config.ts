import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from '../core/auth.interceptor';
import { ErrorInterceptor } from '../core/error.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from "@angular/fire/auth";

export const secretEnvironment = {
  apiKey: "AIzaSyAZord6tXK6CmSFodMhHMW45KQgkgU5axA",
  authDomain: "game-front-b9072.firebaseapp.com",
  projectId: "game-front-b9072-88e08",
  storageBucket: "game-front-b9072.firebasestorage.app",
  messagingSenderId: "683870065983",
  appId: "1:683870065983:web:4d0271b0161176591caf8a",
  measurementId: "G-689TW05V3N"
};
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimations(),
  provideToastr(), provideHttpClient(
    withInterceptorsFromDi()
  ), provideNativeDateAdapter(),
    DatePipe,
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(secretEnvironment)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
};
