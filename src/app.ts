import express, { Request, Response, NextFunction } from 'express';

import router from './routes/index';
import createError, { HttpError } from 'http-errors';
import compression from 'compression';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression())
app.use(express.static(path.join(__dirname, '../public')));

app.use(router);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: HttpError, req: Request, res: Response) => {
  // set locals, only providing error in development

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
