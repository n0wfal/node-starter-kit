/**
 * Router
 * @module
 */
import express, { Request, Response, Router, Application } from 'express';
import authRouter from './auth';
import userRouter from './user';
const router: Router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.get('/', (req: Request, res: Response) => {
  res.render('index', {
    title: "Express"
  })
});

/**
 * @description Used to register the routes with an express application.
 * @param app Express application.
 */
export function register(app: Application) {
  app.use(router);
}

export default router;
