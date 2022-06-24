import { NextFunction, Request, Response } from 'express';
import { authenticateUser, User } from '../users/user-service';
import { validateUserLoginPost } from '../users/user-post-transformer';
import { badRequest, ExpressContext, internalServerError } from '../../utils/service-utils/Outcome';
import bodyParser from 'body-parser';
import { refreshJwtToken } from '../tokens/token-service';

const express = require('express');
const autoLoginRouter = express.Router();

const jsonParser = bodyParser.json();

autoLoginRouter.get(
  '/login',
  jsonParser,
  async (req: Request, res: Response, throwable: NextFunction) => {
    const refresh_token = (req as any).token;
    try {
      const outcome = await refreshJwtToken(refresh_token);
      const context = new ExpressContext(res, throwable);
      outcome.withContext(context).transformOrThrow();
    } catch (e) {
      console.error(e);
      throwable(internalServerError().getResponse());
    }
  }
);

export { autoLoginRouter };
