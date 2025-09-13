import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Injectable({ providedIn: 'root' })
export class CustomAuthService {
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  async login() {
    await this.oktaAuth.signInWithRedirect();
  }

  async logout() {
    await this.oktaAuth.signOut();
  }

  async getAccessToken() {
    return await this.oktaAuth.getAccessToken();
  }

  isAuthenticated(): boolean {
    return this.oktaAuth.authStateManager.getAuthState()?.isAuthenticated ?? false;
  }
}
