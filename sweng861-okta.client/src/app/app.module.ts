import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { OktaAuthModule, OktaCallbackComponent, OKTA_AUTH, OKTA_CONFIG } from '@okta/okta-angular';
import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { oktaAuth } from './okta.config';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'login/callback', component: OktaCallbackComponent },
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainComponent }   
    ]),
    OktaAuthModule
  ],
  providers: [{ provide: OKTA_AUTH, useValue: oktaAuth }, { provide: OKTA_CONFIG, useValue: oktaAuth }],
  bootstrap: [AppComponent]
})
export class AppModule {}
