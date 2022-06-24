import { HttpException } from './HttpException';
import { NextFunction, Request, Response } from 'express';
import { forbidden, unauthorized } from '../service-utils/Outcome';
import { verifyJWT } from '../jwt';
import { logger } from '../../logger';
import { TokenExpiredError } from 'jsonwebtoken';
import { COOKIE_KEYS } from './cookies';

export const decodeHeader = (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies[COOKIE_KEYS.JWT_TOKEN] || req.headers.authorization;
  console.error('LOGOUT CALLED', req.url);
  if (!token) {
    const { statusCode, message } = unauthorized('No authorization header found').getResponse();
    res.status(statusCode);
    return res.json({ error: message }).send();
  }
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
    if (!token || token === '') {
      const { statusCode, message } = unauthorized('No bearer token was provided').getResponse();
      res.status(statusCode);
      return res.json({ error: message }).send(message);
    }
  }

  try {
    // call the verifyJWT method to verify the token is valid
    const decoded = verifyJWT(token);
    if (!decoded) {
      const { statusCode, message } = forbidden('Invalid signature').getResponse();
      res.status(statusCode);
      return res.json({ error: message }).send();
    }
    // attach the decoded token to the req.user object
    if (decoded) (req as any).user = decoded;
    (req as any).token = token;
    return next();
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      const { statusCode, message } = forbidden('Token Expired').getResponse();
      res.status(statusCode);
      return res.json({ error: message }).send();
    }
  }
};

export const decodeRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies[COOKIE_KEYS.REFRESH_TOKEN];
  console.error({ token });
  if (!token) {
    const { statusCode, message } = unauthorized('No authorization header found').getResponse();
    res.status(statusCode);
    return res.json({ error: message }).send();
  }

  try {
    // call the verifyJWT method to verify the token is valid
    const decoded = verifyJWT(token);
    if (!decoded) {
      const { statusCode, message } = forbidden('Invalid signature').getResponse();
      res.status(statusCode);
      return res.json({ error: message }).send();
    }
    // attach the decoded token to the res.user object
    if (decoded) (req as any).user = decoded;
    (req as any).token = token;
    return next();
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      const { statusCode, message } = forbidden('Token Expired').getResponse();
      res.status(statusCode);
      return res.json({ error: message }).send();
    }
  }
};
