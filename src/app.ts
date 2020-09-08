import express, { Request, Response, NextFunction } from 'express';

import router from './routes/index';
import createError, { HttpError } from 'http-errors';
import compression from 'compression';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/errorHandler';
import passport from './middlewares/passport';

const app = express();

// view engine setup


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression())
app.use(express.static(path.join(__dirname, '../public')));
app.use(passport.initialize());
app.use(router);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res)  
});


export default app;
