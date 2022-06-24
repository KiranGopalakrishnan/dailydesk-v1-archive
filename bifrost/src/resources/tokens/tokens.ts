import { NextFunction, Request, Response } from 'express';
import { userPostTransformer, validateUserPost } from '../users/user-post-transformer';
import {
  badRequest,
  ExpressContext,
  internalServerError,
  Outcome,
  unauthorized,
} from '../../utils/service-utils/Outcome';

import bodyParser from 'body-parser';
import { refreshJwtToken, revokeTokenForId, verifyJwtToken } from './token-service';
import { logger } from '../../logger';
import { prisma } from '../../utils/db';
import { getUserById, User } from '../users/user-service';
import { TokenExpiredError } from 'jsonwebtoken';

const jsonParser = bodyParser.json();
const express = require('express');
const router = express.Router();

router.get('/verify', jsonParser, async (req: Request, res: Response, throwable: NextFunction) => {
  const data = req.body as { token: string };
  const token = ((req as any).token as string) || data.token;
  if (!token) throwable(badRequest('No token was provided to verify').getResponse());
  try {
    const outcome = await verifyJwtToken(token);

    const context = new ExpressContext(res, throwable);
    outcome.withContext(context).transformOrThrow();
  } catch (e) {
    logger.error(e);
    if (e instanceof TokenExpiredError) return new Outcome(unauthorized('Token expired'));
    throwable(internalServerError().getResponse());
  }
});

router.post(
  '/refresh',
  jsonParser,
  async (req: Request, res: Response, throwable: NextFunction) => {
    const data = req.body as { token: string };
    const token = ((req as any).token as string) || data.token;
    if (!token) throwable(badRequest('No refresh token was provided').getResponse());
    try {
      const outcome = await refreshJwtToken(token);
      const context = new ExpressContext(res, throwable);
      outcome.withContext(context).transformOrThrow();
    } catch (e) {
      logger.error(e);
      throwable(internalServerError().getResponse());
    }
  }
);

router.get(
  '/revoke/:id',
  jsonParser,
  async (req: Request, res: Response, throwable: NextFunction) => {
    const id = req.params.id;
    if (!id) throwable(badRequest('User id must be provided').getResponse());
    try {
      const outcome = await revokeTokenForId(id);
      const context = new ExpressContext(res, throwable);
      outcome.withContext(context).transformOrThrow();
    } catch (e) {
      logger.error(e);
      throwable(internalServerError().getResponse());
    }
  }
);
export { router };
