import dotenv from 'dotenv';
import args from './args.config.js';

let environment = args.mode;

dotenv.config({
    path: `./.env.${environment}`,
});

export default {
    NODE_ENV: process.env.NODE_ENV,
    PORT: +process.env.PORT || 8080,
    SECRET_KEY: process.env.SECRET_KEY,
    SESSION_KEY: process.env.SESSION_KEY,
    MONGO_URI: process.env.MONGO_URI,
    MAILING_SERVICE: process.env.MAILING_SERVICE,
    MAILING_USER: process.env.MAILING_USER,
    MAILING_PASSWORD: process.env.MAILING_PASSWORD,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
    TICKET_KEY: process.env.TICKET_KEY

}