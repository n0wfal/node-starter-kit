import express, { Request, Response, Router, NextFunction } from 'express';
import { User, UserRequestAttributes } from '../models/user';
import validate, { SIGN_UP_CHECKS, LOGIN_CHECKS } from '../middlewares/validators';
import models from '../models';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import passport from '../middlewares/passport';
const router: Router = express.Router();

/**
 * @description This route is used for user signup using an email and password.
 */
router.post('/signup', SIGN_UP_CHECKS, validate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDetails: UserRequestAttributes = req.body;
    const newUser: User = await User.create(userDetails);
    return res.status(200).json({
      message: "Signup succesful"
    })
  } catch (error) {
      return next(createHttpError(StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}); 

/**
 * User login with email and password.
 */
router.post('/login', passport.authenticate('local', {
  session: false
}), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as User;
      return res.status(200).json({
        email: user!.email,
        message: "Login success"
      });
    } catch (error) {
      return next(createHttpError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
});

/**
 * Google auth initiator and failure callback route.
 */
router.get('/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
}));

/**
 * Google auth success callback.
 */
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/google',
  session: false
}), async (req, res) => {
    const user = req.user as User;
    res.status(200).json({
      email: user!.email,
      message: "Login success"
  })
});

export default router;
