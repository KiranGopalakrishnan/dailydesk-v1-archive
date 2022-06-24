import {
  badRequest,
  forbidden,
  internalServerError,
  notFound,
  Outcome,
  success,
  unauthorized,
} from '../../utils/service-utils/Outcome';
import { prisma } from '../../utils/db';
import { comparePassword, generateTokens, verifyJWT } from '../../utils/jwt';
import { userDocumentTransformer, userTokenTransformer } from '../users/user-post-transformer';
import { logger } from '../../logger';
import { getUserById, User } from '../users/user-service';
import { nanoid } from 'nanoid';
import { generateId } from '../../utils/nano-id';
import { TokenExpiredError } from 'jsonwebtoken';
import { getJWTCookieData, getRefreshTokenCookieData } from '../../utils/http/cookies';

export enum TokenStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  REVOKED = 'REVOKED',
}

export interface TokenRecord {
  id: string;
  userId: string;
  token: string;
  status: TokenStatus;
}

export const verifyJwtToken = async (token: string): Promise<Outcome> => {
  try {
    const decodedJWT = verifyJWT<User>(token);
    return new Outcome(success(decodedJWT));
  } catch (e) {
    logger.error('verifyJwtToken', e);
    throw e;
  }
};

export const saveRefreshToken = async (userId: string, token: string): Promise<string> => {
  try {
    const id = generateId();
    await prisma.accessTokens.updateMany({
      where: {
        userId,
      },
      data: {
        status: TokenStatus.INACTIVE,
      },
    });

    await prisma.accessTokens.create({
      data: {
        id,
        token,
        userId,
        status: TokenStatus.ACTIVE,
      },
    });
    return token;
  } catch (e) {
    logger.error('saveRefreshToken', e);
    throw e;
  }
};

export const getExistingRefreshToken = async (userId?: string): Promise<TokenRecord | null> => {
  if (!userId) return null;
  try {
    const tokenRecord = await prisma.accessTokens.findFirst({
      where: {
        userId,
        status: TokenStatus.ACTIVE,
      },
    });
    if (!tokenRecord) return null;
    const { status, ...rest } = tokenRecord;
    return {
      ...rest,
      status: status as TokenStatus,
    };
  } catch (e) {
    logger.error('getExistingRefreshToken', e);
    throw e;
  }
};

export const revokeTokenForId = async (userId: string): Promise<Outcome> => {
  if (!userId) return new Outcome(badRequest('User id was not provided'));
  try {
    const tokenRecord = await prisma.accessTokens.updateMany({
      where: {
        userId,
        status: TokenStatus.ACTIVE,
      },
      data: {
        status: TokenStatus.REVOKED,
      },
    });
    return new Outcome(success<string>('Successfully revoked'));
  } catch (e) {
    logger.error('revokeTokenForId', e);
    throw e;
  }
};

export const isTokenRecordValid = async (token: string): Promise<boolean> => {
  try {
    const record = await prisma.accessTokens.findUnique({
      where: {
        token_status_unique_constraint: {
          token,
          status: TokenStatus.ACTIVE as string,
        },
      },
    });
    return !!record;
  } catch (e) {
    logger.error('isTokenRecordValid', e);
    throw e;
  }
};

export const refreshJwtToken = async (token: string): Promise<Outcome> => {
  try {
    const verifiedToken = verifyJWT<{ id: User['id'] }>(token);
    if (!verifiedToken) return new Outcome(unauthorized('Invalid Refresh token'));

    const record = await getExistingRefreshToken(verifiedToken.payload?.id);
    if (!record) return new Outcome(unauthorized('Token is no longer valid'));

    if (!(await isTokenRecordValid(token)))
      return new Outcome(unauthorized('Token is no longer valid'));

    const user = await getUserById(record.userId);
    if (!user) return new Outcome(unauthorized('User id associated to this token is invalid'));

    const tokens = await generateTokens(user);
    //save the refresh token
    await saveRefreshToken(record.userId, tokens.refresh_token);
    const refreshCookie = getRefreshTokenCookieData(tokens.refresh_token);
    const jwtCookie = getJWTCookieData(tokens.token);

    return new Outcome(success({ message: 'Refreshed' }))
      .withTokenCookie(refreshCookie)
      .withTokenCookie(jwtCookie);
  } catch (e) {
    logger.error('refreshJwtToken', e);
    if (e instanceof TokenExpiredError) return new Outcome(unauthorized('Token expired'));
    return new Outcome(internalServerError());
  }
};
