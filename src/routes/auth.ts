import express, { Request, Response, Router, NextFunction } from 'express';
import { User, UserRequestAttributes } from '../models/user'
import models from '../models';
const user = models.User;
const router: Router = express.Router();
/* POST users listing. */
router.get('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDetails: UserRequestAttributes = req.body;
    const newUser: User = await user.create(userDetails);

    return res.status(200).json({
      message: "Signup succesful"
    })
  } catch (error) {
    next({})
    }
    
});

export default router;
