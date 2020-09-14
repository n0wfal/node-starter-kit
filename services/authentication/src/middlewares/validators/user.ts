/**
 * User validation chains.
 * @module
 */
import { body } from 'express-validator';
import { User } from '../../models/user';
import { LOGIN_RESPONSE_MESSAGES, SIGNUP_RESPONSE_MESSAGES } from '../../utils/lang';

/**
 * Checks to be done before proceeding with the signup request.
 */
export const SIGN_UP_CHECKS = [
    body('email')
        .exists()
        .withMessage(SIGNUP_RESPONSE_MESSAGES.EMAIL_REQUIRED) 
        .bail()
        .normalizeEmail()
        .isEmail()
        .withMessage(SIGNUP_RESPONSE_MESSAGES.INVALID_EMAIL)
        .custom(email => {
            return User.findOne({
                where: {
                    email
                }
            })
                .then(user => {
                    if (user) return Promise.reject(SIGNUP_RESPONSE_MESSAGES.EXISTING_USER);
                    return;
                });
        }),
    body('name')
        .exists()
        .withMessage('Name is required.'),
    body('password')
        .exists()
        .withMessage(SIGNUP_RESPONSE_MESSAGES.PASSWORD_REQUIRED)
        .bail()
        .isLength({
            min: 8,
            max: 16
        })
        .withMessage(SIGNUP_RESPONSE_MESSAGES.PASSWORD_LENGTH)
        .bail()
        .isAlphanumeric()
        .withMessage(SIGNUP_RESPONSE_MESSAGES.PASSWORD_ALPHANUMERIC)
        ,
    body('confirmPassword')
        .exists()
        .withMessage(SIGNUP_RESPONSE_MESSAGES.PASSWORD_CONFIRMATION_REQUIRED)
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error(SIGNUP_RESPONSE_MESSAGES.PASSWORD_CONFIRMATION);
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
        .withMessage(LOGIN_RESPONSE_MESSAGES.EMAIL_REQUIRED)
        .bail()
        .normalizeEmail()
        .isEmail()
        .withMessage(LOGIN_RESPONSE_MESSAGES.INVALID_EMAIL),
    body('password')
        .exists()
        .bail()
        .withMessage(LOGIN_RESPONSE_MESSAGES.PASSWORD_REQUIRED)
];