import {config} from 'dotenv'
config()

export const ENVIRONMENT = process.env.ENVIRONMENT
export const MOCK_ADDR = process.env.MOCK_ADDR