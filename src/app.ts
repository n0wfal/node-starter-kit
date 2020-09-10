/**
 * Express Application.
 * @module
 */

import express, { Request, Response, NextFunction } from 'express';

import router from './routes/index';
import createError, { HttpError } from 'http-errors';
import compression from 'compression';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/error-handler';
import passport from './middlewares/passport';
import Sentry from '@sentry/node';
import { SENTRY_DSN } from './config';

if (SENTRY_DSN) {
  //Initialize sentry if the sentry DSN is set.
  Sentry.init({
    dsn: SENTRY_DSN
  });
}

const app = express();

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression())
app.use(express.static(path.join(__dirname, '../public')));
app.use(passport.initialize());
app.use(router);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(createError(404, "Route not found"));
});

// error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res)  
});


export default app;
