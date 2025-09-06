import { Component, Inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    console.log('OktaAuth injected in AppComponent:', oktaAuth);
  }

}
