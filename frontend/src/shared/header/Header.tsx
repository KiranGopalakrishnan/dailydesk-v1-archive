import React, { FC } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

import { theme } from '@ui-kit/Theme';
import { DailyDeskLogo } from '@ui-kit/assets/DailyDeskLogo';
import { colors } from '@ui-kit/Theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@store/user/user-thunk';
import { useRouter } from 'next/router';
import { RootState } from '@store';
import { AuthenticationStatus } from '@store/user';
import { RenderConditionally } from '@shared/utils/RenderConditionally';
import { isPublic } from '@config/routes';

const useStyles = makeStyles({
  header: {
    height: '72px',
    padding: theme.spacing(2),
    borderBottom: `solid 1px ${colors.GREY_4}`,
  },
  logout: {
    cursor: 'pointer',
    color: colors.BLUE_3,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export const Header: FC = () => {
  const styles = useStyles();
  const router = useRouter();

  const authStatus = useSelector((state: RootState) => state.user.authStatus);

  const path = router.pathname;
  const isPublicRoute = isPublic(path);

  const isLoggedIn = authStatus === AuthenticationStatus.LOGGED_IN;
  const shouldShowLoggedInOptions = isPublicRoute && isLoggedIn;

  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(logout());
    router.push('/sign-in');
  };

  return (
    <Grid container style={{ height: '100%' }}>
      <Grid container className={styles.header}>
        <Grid container item xs={4} justify="flex-start">
          <DailyDeskLogo />
        </Grid>
        <RenderConditionally basedOn={shouldShowLoggedInOptions}>
          <Grid container item xs={8} justify="flex-end" alignItems="center">
            <Grid item>
              <Typography className={styles.logout} onClick={onClick}>
                {'Logout'}
              </Typography>
            </Grid>
          </Grid>
        </RenderConditionally>
      </Grid>
    </Grid>
  );
};
