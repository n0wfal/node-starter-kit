/**
 * Router
 * @module
 */
import express, { Router, Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express';
import { options } from '../utils/swagger';
import authRouter from './auth';
import userRouter from './user';
const router: Router = express.Router();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Node Starter",
      description: "Node JS typescript starter kit.",
    }
  },
  apis: ["./*.js", './*.ts', 'src/routes/*.ts']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/api-docs', swaggerUi.serve,)
router.get('/api-docs', swaggerUi.setup(swaggerDocs))

/**
 * @description Used to register the routes with an express application.
 * @param app Express application.
 */
export function register(app: Application) {
  app.use(router);
}

export default router;
