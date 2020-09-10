import { GOOGLE_CREDENTIALS } from '../../config';
import { User } from '../../models/user';
import { UserSocialMediaProfile } from '../../models/user-social-media-profiles';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import models from '../../models';

/**
 * Oauth strategy using google.
 */
const googleStrategy = new GoogleStrategy({
    clientID: GOOGLE_CREDENTIALS.CLIENT_ID,
    clientSecret: GOOGLE_CREDENTIALS.CLIENT_SECRET,
    callbackURL: GOOGLE_CREDENTIALS.CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        if (!profile || !profile.emails || !profile.emails.length || !profile.emails[0].value) {
            done(new Error('Email is required'))
        } else {
            const user = await User.findOne({
                where: {
                    email: profile.emails[0].value
                },
                include: [{
                    model: models.UserSocialMediaProfiles,
                    where: {
                        google_id: profile.id
                    }
                }]
            });
            if (!user) {
                try {
                    const newUser = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value
                    });
                    const newSocialMediaProfile = await UserSocialMediaProfile.create({
                        google_id: profile.id,
                        user_id: newUser.id
                    })
                    return done(undefined, newUser)

                } catch (error) {
                    return done(error);
                }
            }
            return done(undefined, user);
        }
    } catch (error) {
        return done(error)
    }
});

export default googleStrategy;
