import React, { FC } from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { PulseLoader } from 'react-spinners';
import { theme } from '@ui-kit/Theme';

export const LoadingState: FC = () => {
  return (
    <Grid container justify={'center'} alignItems={'center'}>
      <PulseLoader color={theme.palette.primary.main} />
    </Grid>
  );
};
