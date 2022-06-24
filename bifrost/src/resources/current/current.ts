import express, { NextFunction, Request, Response } from 'express';
import { getUser, logoutUser, User } from '../users/user-service';
import { ExpressContext, internalServerError } from '../../utils/service-utils/Outcome';
import { COOKIE_KEYS } from '../../utils/http/cookies';
import bodyParser from 'body-parser';
import { DecodedToken } from '../../utils/jwt';
import { client } from '../../grpc/client';

const jsonParser = bodyParser.json();
const currentRoute = express.Router();

interface TokenResponse {
  token: string;
  refresh_token: string;
}

currentRoute.get(
  '/me',
  jsonParser,
  async (req: Request, res: Response, throwable: NextFunction) => {
    const decodedToken = (req as any).user as DecodedToken<User>;
    if (!decodedToken) throwable(internalServerError().getResponse());
    try {
      const outcome = await getUser(decodedToken.payload.id);
      const context = new ExpressContext(res, throwable);
      outcome.withContext(context).transformOrThrow();
    } catch (e) {
      console.error(e);
      throwable(internalServerError().getResponse());
    }
  }
);

currentRoute.get(
  '/logout',
  jsonParser,
  async (req: Request, res: Response, throwable: NextFunction) => {
    const { payload } = (req as any).user as DecodedToken<User>;
    const context = new ExpressContext(res, throwable);
    try {
      const outcome = await logoutUser(payload.id);
      res.clearCookie(COOKIE_KEYS.JWT_TOKEN);
      res.clearCookie(COOKIE_KEYS.REFRESH_TOKEN);
      outcome.withContext(context).transformOrThrow(undefined);
    } catch (e) {
      console.error(e);
      throwable(internalServerError().getResponse());
    }
  }
);

export { currentRoute };
