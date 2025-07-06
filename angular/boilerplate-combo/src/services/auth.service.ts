import { Injectable, signal } from '@angular/core';
import { User, UserManager, WebStorageStateStore } from 'oidc-client-ts';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userManager: UserManager;
  private currentUser = signal<User | null>(null);

  constructor() {
    this.userManager = new UserManager({
      authority: 'https://auth.frosthand.com/realms/frosthand',
      client_id: 'www-frosthand-angular-client',
      redirect_uri: 'https://www.frosthand.com/angular/callback',
      response_type: 'code',
      scope: 'openid profile email',
      post_logout_redirect_uri: 'https://www.frosthand.com',

      userStore: new WebStorageStateStore({ store: window.localStorage }),
    });

    this.userManager.getUser().then(user => {
      this.currentUser.set(user && !user.expired ? user : null);
    });
  }

  public get user() {
    return this.currentUser();
  }

  public loginWithEmail() {
    return this.userManager.signinRedirect();
  }

  public loginWithGoogle() {
    return this.userManager.signinRedirect({
      extraQueryParams: {
        kc_idp_hint: 'google',
      }
    });
  }

  public loginWithMicrosoft() {
    return this.userManager.signinRedirect({
      extraQueryParams: {
        kc_idp_hint: 'microsoft',
      }
    });
  }

  public loginWithGithub() {
    return this.userManager.signinRedirect({
      extraQueryParams: {
        kc_idp_hint: 'github',
      }
    });
  }

  public async completeLogin() {
    const user = await this.userManager.signinRedirectCallback();
    this.currentUser.set(user);
  }

  public logout() {
    return this.userManager.signoutRedirect();
  }
}
