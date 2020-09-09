import { Oauth_Credentials } from "../@types/oauth";

export const GOOGLE_CREDENTIALS: Oauth_Credentials = {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID',
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'GOOGLE_CLIENT_SECRET',
    CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || 'GOOGLE_CALLBACK_URL'
};

export default GOOGLE_CREDENTIALS;