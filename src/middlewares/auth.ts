import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as tokenUtil from '../util/tokenGenerator';

const auth: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const { authorization: authHeader } = req.headers;

  if (!authHeader) {
    return res.status(401).json('no authorization header');
  }

  if (authHeader.toLowerCase().startsWith('Bearer ') || authHeader.split(' ').length !== 2) {
    return res.status(401).json('malformed token');
  }

  const token = authHeader.split(' ')[1];
  const authorized = tokenUtil.validate(token);

  if (!authorized) {
    return res.status(401).json('not authorized');
  }

  return next();
};

export default auth;