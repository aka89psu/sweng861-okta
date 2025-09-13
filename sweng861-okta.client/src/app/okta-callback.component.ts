import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-custom-callback',
  template: `<p>Logging in... Please wait.</p>`
})
export class CustomCallbackComponent implements OnInit {
  constructor(
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
    private router: Router,
    private userservices: UserService
  ) { }

  async ngOnInit() {
    try {
      await this.oktaAuth.handleLoginRedirect();


      // Get access token
      const accessToken: any = await this.oktaAuth.tokenManager.get('accessToken');
      const idToken: any = await this.oktaAuth.tokenManager.get('idToken');

      // Extract user info from ID token
      const userInfo = idToken?.claims;
      const email = userInfo?.email;
      const name = userInfo?.name;
      const expiresAt = idToken?.expiresAt;

      console.log('Access Token:', accessToken?.accessToken);
      console.log('User Info:', userInfo);
      console.log('Email:', email);
      console.log('Name:', name);
      console.log('Expires At:', new Date(expiresAt * 1000));

      let user: User = new User();

      user.name = name;
      user.email = email;
      user.token = accessToken?.accessToken;
      user.expires = new Date(expiresAt * 1000);

      this.userservices.postUsers([user]);

      //this.router.navigate(['/main']);
    } catch (err) {
      console.error('Login callback error:', err);
    }
  }
}
