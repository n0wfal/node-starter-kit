/**
 * Password module.
 * @module
 */
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * @description Used to hash passwords.
 * @param {string} password Password string to be hashed.
 * @returns {Promise<string>} hash.
 */
export const hashPassword = async (password: string): Promise<string> => bcrypt.hash(password, SALT_ROUNDS);

/**
 * @description Used to verify a password using the hash stored in the db against the user.
 * @param plainTextPassword The password to be verified.
 * @param hash The hash stored in the db for the user.
 * @returns {Promise<Boolean>}
 */
export const comparePasswords = async (plainTextPassword: string, hash: string) => bcrypt.compare(plainTextPassword, hash);