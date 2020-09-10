import express, { Request, Response, Router, NextFunction } from 'express';
import { User, UserRequestAttributes } from '../models/user';
import validate, { SIGN_UP_CHECKS, LOGIN_CHECKS } from '../middlewares/validators';
import models from '../models';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import passport from '../middlewares/passport';
const router: Router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *  post:
 *    summary: New user signup.
 *    tags:
 *      - Auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              confirmPassword:
 *                type: string
 *            example:
 *              name: John Doe
 *              email:  johndoe@example.com
 *              password: 12345678
 *              confirmPassword:  12345678
 *    responses:
 *      '200':
 *        description: Successful signup
 *      '400':
 *        description:  Invalid user input
 *      '500':
 *        description:  Internal server error
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
 * @swagger
 * /auth/login:
 *  post:
 *    summary: New user login.
 *    tags:
 *      - Auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *            example:
 *              email:  johndoe@example.com
 *              password: 12345678
 *    responses:
 *      '200':
 *        description:  Successful login
 *      '404':
 *        description:  User with specified email not found.
 *      '401':
 *        description:  Invalid password
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
 * @swagger
 * /auth/google/callback:
 *  post:
 *    summary: Google OAuth login callback route.
 *    tags:
 *      - Auth
 *    responses:
 *      '200':
 *        description:  Successful login
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
