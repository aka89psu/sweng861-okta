
import { OktaAuth } from '@okta/okta-auth-js';

export const oktaAuth = new OktaAuth({
  issuer: 'https://trial-7039807.okta.com/oauth2/default',
  clientId: '0oav6th7polRMWkz9697',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  devMode: true
});
