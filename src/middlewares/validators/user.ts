import { body } from 'express-validator';

export const SIGN_UP_CHECKS = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .normalizeEmail()
        .isEmail()
        .withMessage('Email is not valid'),
    body('name')
        .exists()
        .withMessage('Name is required')
        .isAlpha()
        .withMessage('Name is not valid'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .isLength({
            min: 8,
            max: 16
        }),
    body('confirmPassword')
        .exists()
        .withMessage('Password confirmation is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            } 
            return true;
        })   
];

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