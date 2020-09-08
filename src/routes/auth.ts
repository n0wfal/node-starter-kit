import express, { Request, Response, Router } from 'express';
import { User } from '../models/user'
import models from '../models';
const user = models.User;
const router: Router = express.Router();
/* POST users listing. */
router.get('/signup', async (req: Request, res: Response) => {
  try {
    
    return res.status(200).json({
      message: "Signup succesful"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message
      
    })
    }
    
});

export default router;
