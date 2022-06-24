import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { autoLogin } from '@store/user/user-thunk';
import { RootState } from '@store';
import { AuthenticationStatus } from '@store/user';
import { useRouter } from 'next/router';
import { isPublic, routes } from '@config/routes';

const TOKEN_EXPIRY_IN_MS = 13 * 60 * 1000;

export const WithAutoLogin: FC = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const path = router.route;
  const isPublicRoute = isPublic(path);
  const authStatus = useSelector((state: RootState) => state.user.authStatus);

  useEffect(() => {
    let autoLoginRefresh: any = null;
    if (!isPublicRoute) {
      dispatch(autoLogin());
      autoLoginRefresh = setInterval(() => dispatch(autoLogin()), TOKEN_EXPIRY_IN_MS);
    }

    return () => {
      if (autoLoginRefresh) clearInterval(autoLoginRefresh);
    };
  }, []);

  useEffect(() => {
    console.error({ path, authStatus, isPublicRoute });

    if (authStatus && !isPublicRoute && authStatus !== AuthenticationStatus.LOGGED_IN) {
      router.push(routes.SIGN_IN.url);
    }
  }, [authStatus]);

  return <>{children}</>;
};
