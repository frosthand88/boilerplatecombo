import { User, UserManager, WebStorageStateStore } from 'oidc-client-ts'

const userManager = new UserManager({
    authority: 'https://auth.frosthand.com/realms/frosthand',
    client_id: 'www-frosthand-vue-client',
    redirect_uri: 'https://www.frosthand.com/vue/callback',
    response_type: 'code',
    scope: 'openid profile email',
    post_logout_redirect_uri: 'https://www.frosthand.com',

    // 👇 Token storage config
    userStore: new WebStorageStateStore({ store: window.localStorage }),
})

export default {
    getUser: () => userManager.getUser(),
    loginWithEmail: () => userManager.signinRedirect(),
    loginWithGoogle: () => userManager.signinRedirect({
        extraQueryParams: {
            kc_idp_hint: 'google',
        },
    }),
    loginWithMicrosoft: () => userManager.signinRedirect({
        extraQueryParams: {
            kc_idp_hint: 'microsoft',
        },
    }),
    loginWithGithub: () => userManager.signinRedirect({
        extraQueryParams: {
            kc_idp_hint: 'github',
        },
    }),
    completeLogin: () => userManager.signinRedirectCallback(),
    logout: () => userManager.signoutRedirect(),
}