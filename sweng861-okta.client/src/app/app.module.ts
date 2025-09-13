import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { OktaAuthModule, OktaCallbackComponent, OKTA_AUTH, OKTA_CONFIG } from '@okta/okta-angular';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { CustomCallbackComponent } from './okta-callback.component';
import { oktaAuth } from './okta.config';
import { UserService } from './user.service';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'login/callback', component: CustomCallbackComponent },
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainComponent }   
    ]),
    OktaAuthModule
  ],
  providers: [UserService, { provide: OKTA_AUTH, useValue: oktaAuth }, { provide: OKTA_CONFIG, useValue: oktaAuth }, provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule {}
