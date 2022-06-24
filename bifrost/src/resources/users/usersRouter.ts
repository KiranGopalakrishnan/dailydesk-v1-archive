import { NextFunction, Request, Response } from 'express';
import { authenticateUser, createUser, User } from './user-service';
import {
  validateUserLoginPost,
  validateUserPost,
} from './user-post-transformer';
import {
  badRequest,
  ExpressContext,
  internalServerError,
} from '../../utils/service-utils/Outcome';
import bodyParser from 'body-parser';

const express = require('express');
const usersRoute = express.Router();

const jsonParser = bodyParser.json();

interface TokenResponse {
  token: string;
  refresh_token: string;
}

usersRoute.post('/', jsonParser, async (req: Request, res: Response, throwable: NextFunction) => {
  const userPost = req.body as User;
  const isPostValid = validateUserPost(userPost);
  if (!isPostValid) throwable(badRequest('Invalid arguments').getResponse());
  try {
    const outcome = await createUser(userPost);
    const context = new ExpressContext(res, throwable);
    outcome.withContext(context).transformOrThrow();
  } catch (e) {
    console.error(e);
    throwable(internalServerError().getResponse());
  }
});

usersRoute.post(
  '/login',
  jsonParser,
  async (req: Request, res: Response, throwable: NextFunction) => {
    const userPost = req.body as Pick<User, 'email' | 'password'>;
    const isPostValid = validateUserLoginPost(userPost);
    if (!isPostValid) throwable(badRequest('Invalid arguments').getResponse());
    try {
      const outcome = await authenticateUser(userPost);
      const context = new ExpressContext(res, throwable);
      outcome.withContext(context).transformOrThrow(undefined);
    } catch (e) {
      console.error(e);
      throwable(internalServerError().getResponse());
    }
  }
);

export { usersRoute };
