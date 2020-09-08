import { body, validationResult } from 'express-validator';
export const signUp = [
    body('name').isString(),
];