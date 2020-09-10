/**
 * Passport module.
 * @module
 * */

import passport from 'passport';
import googleStrategy from './google-strategy';
import localStrategy from './local-strategy';

passport
    .use(localStrategy)
    .use(googleStrategy);

export default passport;