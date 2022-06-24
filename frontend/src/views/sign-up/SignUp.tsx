import * as React from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '@store/user/user-thunk';
import { Grid, makeStyles } from '@material-ui/core';
import { colors } from '@ui-kit/Theme/colors';
import { theme } from '@ui-kit/Theme';
import { SignupData, SignUpForm } from '@views/sign-up/SignUpForm';
import Image from 'next/image';

const useStyles = makeStyles({
  container: {
    // background: `linear-gradient(to bottom left, ${colors.WHITE} 50%, ${colors.BLUE_1} 50%)`,
    background: colors.WHITE,
    height: '100%',
  },
  logo: {
    width: '160px',
    height: '80px',
  },
  logoContainer: {
    height: '80px',
  },
  form: {
    width: '480px',
    borderRadius: '8px',
    padding: theme.spacing(4),
    background: colors.WHITE,
  },
  item: {
    padding: theme.spacing(2, 0),
  },
});

const SignUp: React.FC = () => {
  const styles = useStyles();

  const dispatch = useDispatch();


  const onAdd = ({ firstname, lastname, email, company, password }: SignupData) => {
    dispatch(addUser({ firstname, lastname, email, company, password }));
  };

  return (
    <Grid container justify="center" alignItems="center" className={styles.container}>
      <Grid container justify="center" direction="row">
        <Grid item container justify="flex-end" xs={5}>
          <Image src={'/illustrations/signup.png'} width={'700px'} height={'100%'} />
        </Grid>
        <Grid item container justify="center" xs={7}>
          <SignUpForm onSubmit={onAdd} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export { SignUp };
