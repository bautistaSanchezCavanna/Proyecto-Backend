import nodemailer from 'nodemailer';
import ENV from './env.config.js';

export const mailingTransporter = nodemailer.createTransport({
  service: ENV.MAILING_SERVICE,
  port: 587,
  auth: {
      user: ENV.MAILING_USER,
      pass: ENV.MAILING_PASSWORD
  }
});
