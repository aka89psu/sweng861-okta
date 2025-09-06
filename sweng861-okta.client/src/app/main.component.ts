import { Component, Inject, OnInit } from '@angular/core';


import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  isAuthenticated: boolean = false;
  userName: string = '';
  userEmail: string = '';

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {}

  async ngOnInit() {
    this.oktaAuth.authStateManager.subscribe(async (authState: any) => {
      this.isAuthenticated = !!authState?.isAuthenticated;
      if (this.isAuthenticated) {
        const userClaims = await this.oktaAuth.getUser();
        this.userName = userClaims.name || '';
        this.userEmail = userClaims.email || '';
      } else {
        this.userName = '';
        this.userEmail = '';
      }
    });

    const authState = await this.oktaAuth.authStateManager.getAuthState();
    this.isAuthenticated = !!authState?.isAuthenticated;
    if (this.isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.userName = userClaims.name || '';
      this.userEmail = userClaims.email || '';
    }
  }

  async login() {
    await this.oktaAuth.signInWithRedirect();
  }

  async logout() {
    await this.oktaAuth.signOut();
  }
}
