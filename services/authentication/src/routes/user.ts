import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

/* GET users listing. */
router.get('/', (req: Request, res: Response) => {
  res.send('respond with a resource');
});

export default router;
