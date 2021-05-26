import jwt from 'jsonwebtoken';
import config from '../config/config';

const envConfig = config.dev;
const jwtSecret = envConfig.jwt.secret || '';

export const generate = (userIdentifier: string): string => {
  return jwt.sign({ userIdentifier }, jwtSecret, { expiresIn: '12h' });
};

export const validate = (token: string): boolean => {
  try {
    const payload = jwt.verify(token, jwtSecret);
    return !!payload;
  } catch (_e) {
    return false;
  }
};