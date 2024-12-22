import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import env from '../environments/env.json';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: env.FIREBASE_PROJECT_ID,
          appId: env.FIREBASE_APP_ID,
          storageBucket: env.FIREBASE_STORAGE_BUCKET,
          apiKey: env.FIREBASE_API_KEY,
          authDomain: env.FIREBASE_AUTH_DOMAIN,
          messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
