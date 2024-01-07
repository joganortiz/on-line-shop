import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideAnimations(),
    BrowserAnimationsModule,
    provideHttpClient(),

    //provideClientHydration(),
    //provideAnimations(),
    //provideHttpClient(
     // withFetch()
    //),
    //BrowserAnimationsModule,
    BrowserModule,
    importProvidersFrom(
      HttpClientModule,
    )
  ]
};
