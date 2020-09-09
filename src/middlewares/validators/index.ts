/**
 * Validator module
 * @module
 */

import { NextFunction } from "express";
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
export * from './user';

/**
 * Validator middleware that will check the request object for 
 * failed validations before proceeding with the request. If the errors object is not
 * empty one or more of the checks have failed and the next function is called with the error message.
 * 
 * @param {Request} req Request object
 * @param {Response} res Response Object
 * @param {NextFunction} next Express next function.
 * @returns { void } 
 */
const validator = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = createHttpError(StatusCodes.BAD_REQUEST, errors.array({
            onlyFirstError: true
        })[0].msg);
        next(error);
    }
    next();
};

export default validator;