import { UserManagerSettings, WebStorageStateStore  } from 'oidc-client-ts';

export const oidcConfig: UserManagerSettings = {
    authority: 'https://auth.frosthand.com/realms/frosthand',
    client_id: 'www-frosthand-react-client',
    redirect_uri: 'https://www.frosthand.com/react/callback',
    response_type: 'code',
    scope: 'openid profile email',

    // 👇 Token storage config
    userStore: new WebStorageStateStore({ store: window.localStorage }),
};
