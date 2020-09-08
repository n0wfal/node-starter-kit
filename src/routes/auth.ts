import express, { Request, Response, Router, NextFunction } from 'express';
import { User, UserRequestAttributes } from '../models/user';
import validate, { SIGN_UP_CHECKS, LOGIN_CHECKS } from '../middlewares/validators';
import models from '../models';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import passport from '../middlewares/passport';
const user = models.User;
const router: Router = express.Router();

router.post('/signup', SIGN_UP_CHECKS, validate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDetails: UserRequestAttributes = req.body;
    const newUser: User = await user.create(userDetails);
    return res.status(200).json({
      message: "Signup succesful"
    })
  } catch (error) {
      return next(createHttpError(StatusCodes.INTERNAL_SERVER_ERROR, error))
  }

}); 

router.post('/login', passport.authenticate('local', {
  session: false
}),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as User;
      return res.status(200).json({
        email: user.email,
        message: "Login success"
      });
    } catch (error) {
      return next(createHttpError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
});

export default router;
