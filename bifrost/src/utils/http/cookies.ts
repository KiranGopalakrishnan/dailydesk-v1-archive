import { addDays, addMinutes } from 'date-fns';

export interface CookieData {
  key: string;
  value?: string;
  maxAge: number;
  httpOnly: boolean;
  overwrite: boolean;
}

export enum COOKIE_KEYS {
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  JWT_TOKEN = 'JWT_TOKEN',
}

export const getRefreshTokenCookieData = (value: string) => {
  return {
    key: COOKIE_KEYS.REFRESH_TOKEN,
    value,
    maxAge: addDays(new Date(), 59).getTime() / 1000,
    httpOnly: true,
    overwrite: true,
  };
};

export const getJWTCookieData = (value: string) => {
  return {
    key: COOKIE_KEYS.JWT_TOKEN,
    value,
    maxAge: addMinutes(new Date(), 14).getTime() / 1000,
    httpOnly: true,
    overwrite: true,
  };
};
