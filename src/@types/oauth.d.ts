/**
 * An interface for startegies that use OAuth2.0 authentication.
 * CLIENT_ID: client id.
 * CLIENT_SECRET: client secret key.
 * CALLBACK_URL: The callback url configured on the client for succesful authentication. 
 */
export interface Oauth_Credentials {
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    CALLBACK_URL: strin;
}