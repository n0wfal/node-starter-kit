import { Sequelize } from 'sequelize/types';

/**
 * Common export point for all configs.
 * NOTE: config.json is the sequelize config and does not need to be exported.
 */
export const SENTRY_DSN = process.env.SENTRY_DSN || false;
export * from './google-credentials'; 