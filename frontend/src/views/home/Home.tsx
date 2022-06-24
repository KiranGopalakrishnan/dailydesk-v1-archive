import React, { FC } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { theme } from '@ui-kit/Theme';
import { DailyDeskLogo } from '@ui-kit/assets/DailyDeskLogo';
import { colors } from '@ui-kit/Theme/colors';
import { Projects } from '@views/home/projects/Projects';

const useStyles = makeStyles({});

export const Home: FC = () => {
  const styles = useStyles();
  return (
    <Grid container style={{ height: '100%' }}>
      <Projects />
    </Grid>
  );
};
