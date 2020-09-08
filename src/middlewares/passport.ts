import passport from 'passport';
import { User } from '../models/user';

import { Strategy as LocalStrategy } from 'passport-local';
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (username, password, done) => {
    try {
        const user = await User.findOne({
            where: {
                email: username
            }
        });
         if (!user) {
            return done(null, false, { message: 'Incorrect username' });
         }
        if (!await user.comparePassword(password)) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
    } catch (error) {
        done(error);
    }
}));

export default passport;