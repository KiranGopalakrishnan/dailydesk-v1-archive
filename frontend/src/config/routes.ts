import webpack from 'webpack';

export interface Route {
  isPublic: boolean;
  url: string;
  as: (this: Route, params: Record<string, string>, query?: Record<string, string>) => string;
}

function as(this: Route, params: Record<string, string>, query?: Record<string, string>): string {
  const url = this.url;
  if (!params) return url;

  const keys = Object.keys(params);
  return keys.reduce((acc, current) => {
    return url.replace(`[${current}]`, params[current]);
  }, url);
}

export const routes: Record<string, Route> = {
  SIGN_IN: {
    url: '/sign-in',
    as,
    isPublic: true,
  },
  SIGN_UP: {
    url: '/sign-up',
    as,
    isPublic: true,
  },
  HOME: {
    url: '/home',
    as,
    isPublic: false,
  },
  PROJECTS: {
    url: '/projects',
    as,
    isPublic: false,
  },
  PROJECT_OVERVIEW: {
    url: '/projects/[id]',
    as,
    isPublic: false,
  },
};

export const isPublic = (url: string) => {
  const route = Object.entries(routes).find(([key, value]) => value.url === url)?.[1];
  return !!route?.isPublic;
};
