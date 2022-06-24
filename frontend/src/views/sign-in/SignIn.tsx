import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '@store/user/user-thunk';
import { RootState } from '@store';
import { Grid, makeStyles } from '@material-ui/core';
import { colors } from '@ui-kit/Theme/colors';
import { theme } from '@ui-kit/Theme';
import { DailyDeskLogo } from '@ui-kit/assets/DailyDeskLogo';
import { SignInData, SignInForm } from '@views/sign-in/SignInForm';
import { useRouter } from 'next/router';
import { AuthenticationStatus } from '@store/user';
import { routes } from '@config/routes';
import Image from 'next/image';

const useStyles = makeStyles({
  container: {
    background: colors.WHITE,
    height: '100%',
  },
  form: {
    borderRadius: '8px',
    padding: theme.spacing(4),
    background: colors.WHITE,
  },
  item: {
    padding: theme.spacing(2, 0),
  },
});

const SignIn: React.FC = () => {
  const styles = useStyles();

  const history = useHistory();
  const router = useRouter();

  const dispatch = useDispatch();

  const authStatus = useSelector((state: RootState) => state.user.authStatus);
  console.error({ authStatus });

  const onSignIn = ({ email, password }: SignInData) => {
    console.error({email,password})
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (authStatus === AuthenticationStatus.LOGGED_IN) {
      router.push(routes.HOME.url);
    }
  }, [authStatus]);

  return (
    <Grid container justify="center" alignItems="center" className={styles.container}>
      <Grid container justify="center" direction={'row'} style={{ height: '100%' }}>
        <Grid item container justify="center" xs={5}>
          <Image src={'/illustrations/work-signin.svg'} width={'600px'} height={'100%'} />
        </Grid>
        <Grid item container justify="center" alignItems="center" xs={7}>
          <Grid container style={{ width: '460px' }}>
            <SignInForm onSubmit={onSignIn} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { SignIn };
