import { config } from 'dotenv';
config();

export const ENVIRONMENT = process.env.ENVIRONMENT;
export const PROJECT = process.env.PROJECT;
export const MOCK_ADDR = process.env.MOCK_ADDR;
export const NODE_ENV = process.env.NODE_ENV;
