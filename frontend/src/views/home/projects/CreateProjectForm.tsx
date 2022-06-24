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

export interface CreateProject {
  name: string;
}

interface Props {
  onSubmit: (data: CreateProject) => void;
}

const getErrorText = (hasError: boolean, field: string): string | null => {
  if (!hasError) return null;
  const errors: Record<string, string> = {
    name: 'Name is required',
  };
  return errors[field];
};

export const CreateProjectForm: React.FC<Props> = ({ onSubmit }) => {
  const styles = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateProject>();

  const onAdd = ({ name }: CreateProject) => {
    onSubmit({
      name,
    });
  };

  useEffect(() => {
    register('name', {
      validate: {
        isValidName: (value) => !validator.isEmpty(value),
      },
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onAdd)}>
      <Grid container className={styles.form}>
        <Grid container className={styles.item}>
          <Typography variant="h5">{'Create project'}</Typography>
        </Grid>
        <Grid container className={styles.item}>
          <Controller
            name="name"
            control={control}
            defaultValue={''}
            rules={{ required: true, maxLength: 20 }}
            render={({ field }) => (
              <TextField
                error={!!errors.name}
                helperText={getErrorText(!!errors.name, 'name')}
                placeholder="An epic journey"
                label="Project name"
                {...withField(field)}
              />
            )}
          />
        </Grid>
        <Grid container spacing={3} className={styles.item} justify="flex-end">
          <Grid item xs={5}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {'Create Project'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
