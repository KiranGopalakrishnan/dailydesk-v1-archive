import { logger } from '../../logger';

import {
  badRequest,
  ErrorOutcome,
  forbidden,
  internalServerError,
  notFound,
  Outcome,
  success,
} from '../../utils/service-utils/Outcome';
import { prisma } from '../../utils/db';
import {
  userDocumentTransformer,
  userPostTransformer,
  UserResponse,
  userTokenTransformer,
} from './user-post-transformer';
import {
  comparePassword,
  generateRefreshToken,
  generateTokens,
  hashPassword,
  signJWT,
} from '../../utils/jwt';
import {
  getExistingRefreshToken,
  revokeTokenForId,
  saveRefreshToken,
} from '../tokens/token-service';
import { generateId } from '../../utils/nano-id';
import { getJWTCookieData, getRefreshTokenCookieData } from '../../utils/http/cookies';

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  REVOKED = 'REVOKED',
  DELETED = 'DELETED',
}

export interface User {
  id?: string;
  firstname: string;
  lastname: string;
  company: string;
  email: string;
  password: string;
  status: UserStatus;
}

export const getUserById = async (id: User['id']): Promise<User | null> => {
  try {
    const userRecord = await prisma.users.findUnique({
      where: {
        id,
      },
    });
    return userDocumentTransformer().from(userRecord);
  } catch (e) {
    throw e;
  }
};

export const getUser = async (id: User['id']): Promise<Outcome> => {
  try {
    const user = await getUserById(id);
    if (!user) return new Outcome(notFound('No user found with the provided id'));
    return new Outcome(success<UserResponse>(userPostTransformer().to(user)));
  } catch (e) {
    logger.error('getUser', e);
    return new Outcome(internalServerError());
  }
};

export const createUser = async (user: Omit<User, 'id' | 'status'>): Promise<Outcome> => {
  try {
    const id = await generateId();
    const exists = await prisma.users.findUnique({ where: { email: user.email } });

    if (exists) return new Outcome(badRequest('User already exists'));

    const userWithStatus = { ...user, id, status: UserStatus.CREATED };
    const encryptedUser: Required<User> = userDocumentTransformer().to(userWithStatus);
    const newUser = await prisma.users.create({
      data: encryptedUser,
    });

    if (!newUser) return new Outcome(notFound('User creation failed'));

    const transformedUser = userDocumentTransformer().from(newUser);
    const tokens = await generateTokens(transformedUser);

    //save the refresh token
    await saveRefreshToken(transformedUser.id, tokens.refresh_token);

    const response = userTokenTransformer().to(transformedUser);

    const refreshCookieData = getRefreshTokenCookieData(tokens.refresh_token);
    const jwtCookieData = getJWTCookieData(tokens.token);

    return new Outcome(success<UserResponse>(response))
      .withTokenCookie(jwtCookieData)
      .withTokenCookie(refreshCookieData);
  } catch (e) {
    logger.error(e);
    return new Outcome(internalServerError());
  }
};

export const authenticateUser = async (
  user: Pick<User, 'email' | 'password'>
): Promise<Outcome> => {
  try {
    const authenticatedUser = await prisma.users.findUnique({
      where: { email: user.email },
    });

    if (!authenticatedUser || !comparePassword(user.password, authenticatedUser.password))
      return new Outcome(notFound('User not found'));

    if (authenticatedUser.status === UserStatus.REVOKED)
      return new Outcome(forbidden('User access has been revoked'));

    if (authenticatedUser.status === UserStatus.DELETED) return new Outcome(notFound());

    const transformedUser = userDocumentTransformer().from(authenticatedUser);
    const tokens = await generateTokens(transformedUser);

    //save the refresh token
    await saveRefreshToken(transformedUser.id, tokens.refresh_token);

    const response = userPostTransformer().to(transformedUser);
    const refreshCookieData = getRefreshTokenCookieData(tokens.refresh_token);
    const jwtCookieData = getJWTCookieData(tokens.token);

    return new Outcome(success<UserResponse>(response))
      .withTokenCookie(jwtCookieData)
      .withTokenCookie(refreshCookieData);
  } catch (e) {
    console.error(e)
    logger.error(e);
    return new Outcome(internalServerError());
  }
};

export const logoutUser = async (userId: User['id']): Promise<Outcome> => {
  try {
    if (!userId) return new Outcome(badRequest('No user id provided'));
    await revokeTokenForId(userId);
    return new Outcome(
      success<any>({ message: 'Logged out' })
    );
  } catch (e) {
    logger.error(e);
    return new Outcome(internalServerError());
  }
};
