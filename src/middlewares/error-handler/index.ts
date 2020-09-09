import HttpErrors, { HttpError } from 'http-errors';
import { Request, Response } from 'express';
const sendErrorProduction = (err: HttpError, res: Response): Response => 
    res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });

const sendErrorDevelopment = (err: HttpError, res: Response): Response => res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
});
  
export default (err: HttpError, req: Request, res: Response): Response => {
    err.status = err.status || 500;
    err.statusCode = err.statusCode || 500;
    return !res.headersSent && process.env.NODE_ENV?.toLowerCase() === 'production'
        ? sendErrorProduction(err, res)
        : sendErrorDevelopment(err, res);
}