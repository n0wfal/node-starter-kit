/**
 * Error Handler module.
 * @module error-handler.
 */

import { HttpError } from 'http-errors';
import { Request, Response } from 'express';

/**
 * @description If NODE_ENV is set to production error responses will be sent using 
 * this function. Only the status code and the error message will be sent. 
 * 
 * @param {HttpError} err Http error object 
 * @param { Response } res Express response object.
 * @returns { Response } 
 */
const sendErrorProduction = (err: HttpError, res: Response): Response => 
    res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });

/**
 * @description If NODE_ENV is set to anything other than production errors will be sent using 
 * this function. In addition to the usual error message the error stack will also be sent
 * in the response. 
 * 
 * @param {HttpError} err Http error object 
 * @param { Response } res Express response object.
 * @returns { Response } 
 */
const sendErrorDevelopment = (err: HttpError, res: Response): Response => res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
});

/**
 * @description This function will be used to send error responses for errors that are handled
 * by the express error handling middleware. Depending upon the NODE_ENV environment variable it
 * will add the stack trace and additional information in the response.
 * 
 * @param { HttpError } err The error caught by the express error handling middleware.
 * @param { Request } req Express request object.
 * @param { Response } res Express Response object.
 * @returns { Response }
 */
export default (err: HttpError, req: Request, res: Response): Response => {
    err.status = err.status || 500;
    err.statusCode = err.statusCode || 500;
    return !res.headersSent && process.env.NODE_ENV?.toLowerCase() === 'production'
        ? sendErrorProduction(err, res)
        : sendErrorDevelopment(err, res);
}