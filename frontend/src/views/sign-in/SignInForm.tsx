import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import validator from 'validator';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';

import { colors } from '@ui-kit/Theme/colors';

import { theme } from '@ui-kit/Theme';
import { TextField, withField } from '@ui-kit/Input/TextField';

const useStyles = makeStyles({
  form: {
    borderRadius: '8px',
    padding: theme.spacing(4),
    background: colors.WHITE,
  },
  item: {
    padding: theme.spacing(2, 0),
  },
});

export interface SignInData {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (data: SignInData) => void;
}

const getErrorText = (hasError: boolean, field: string): string | null => {
  if (!hasError) return null;
  const errors: Record<string, string> = {
    email: 'A valid Email is required',
  };
  return errors[field];
};

export const SignInForm: React.FC<Props> = ({ onSubmit }) => {
  const styles = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignInData>();

  const onAdd = ({ email, password }: SignInData) => {
    onSubmit({
      email,
      password,
    });
  };

  useEffect(() => {
    register('email', {
      validate: {
        isEmail: (value) => validator.isEmail(value),
      },
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onAdd)}>
      <Grid container className={styles.form}>
        <Grid container className={styles.item}>
          <Typography variant="h3">Sign In</Typography>
        </Grid>
        <Grid container className={styles.item}>
          <Controller
            name="email"
            control={control}
            defaultValue={''}
            rules={{ required: true, maxLength: 100 }}
            render={({ field }) => (
              <TextField
                error={!!errors.email}
                helperText={getErrorText(!!errors.email, 'email')}
                placeholder="luke@resistance.com"
                label="Email"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid container className={styles.item}>
          <Controller
            name="password"
            control={control}
            defaultValue={''}
            rules={{ required: true, maxLength: 20, minLength: 8 }}
            render={({ field }) => (
              <TextField
                error={!!errors.password}
                helperText={getErrorText(!!errors.password, 'password')}
                type="password"
                placeholder="The deathstar has a design flaw"
                label="Password"
                {...field}
              />
            )}
          />
        </Grid>

        <Grid container spacing={3} className={styles.item}>
          <Grid item xs={6}>
            <Button type="reset" fullWidth variant="outlined" color="primary">
              {'Reset'}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" fullWidth variant="outlined" color="primary">
              {'Sign In'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
