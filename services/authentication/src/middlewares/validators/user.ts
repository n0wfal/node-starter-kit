/**
 * User validation chains.
 * @module
 */
import { body } from 'express-validator';

/**
 * Checks to be done before proceeding with the signup request.
 */
export const SIGN_UP_CHECKS = [
    body('email')
        .exists()
        .withMessage('Email is required.') 
        .bail()
        .normalizeEmail()
        .isEmail()
        .withMessage('Email is not valid.'),
    body('name')
        .exists()
        .withMessage('Name is required.'),
    body('password')
        .exists()
        .withMessage('Password is required.')
        .bail()
        .isLength({
            min: 8,
            max: 16
        })
        .withMessage('Password should be alteast 8 characters.')
        .bail()
        .isAlphanumeric()
        .withMessage('Password should be a combination of letters and numbers.')
        ,
    body('confirmPassword')
        .exists()
        .withMessage('Password confirmation is required.')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password.');
            } 
            return true;
        })   
];

/**
 * Checks to be done before proceeding with the login request.
 */
export const LOGIN_CHECKS = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .bail()
        .normalizeEmail()
        .isEmail()
        .withMessage('Email is invalid'),
    body('password')
        .exists()
        .bail()
        .withMessage('Password is required')
];