import React, { FC } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { theme } from '@ui-kit/Theme';
import { DailyDeskLogo } from '@ui-kit/assets/DailyDeskLogo';
import { colors } from '@ui-kit/Theme/colors';
import { Projects } from '@views/home/projects/Projects';

const useStyles = makeStyles({
  projectHeader: {
    height: '80px',
    margin: theme.spacing(3),
  },
});

export const ProjectOverview: FC = () => {
  const styles = useStyles();
  const { current, isLoading } = useSelector((state: RootState) => state.project);
  if (isLoading || !current) return null;
  return (
    <Grid container style={{ height: '100%' }}>
      <Grid container justify="center">
        <Grid container className={styles.projectHeader} alignItems="center">
          <Typography variant={'body1'}>{current?.name}</Typography>
        </Grid>
        <Grid container />
      </Grid>
    </Grid>
  );
};
