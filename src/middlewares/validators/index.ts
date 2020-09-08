import { NextFunction } from "express";
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
export * from './user';
const validator = (req: Request, res: Response, next: NextFunction): Response | void => {
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