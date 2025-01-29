import { config } from 'dotenv';
config();

export const DEFAULT_SERVICE = process.env.DEFAULT_SERVICE;
export const SLACK_CHANEL = process.env.SLACK_CHANEL;
export const PROJECT = process.env.PROJECT;
export const MOCK_ADDR = process.env.MOCK_ADDR;
export const NODE_ENV = process.env.NODE_ENV;
