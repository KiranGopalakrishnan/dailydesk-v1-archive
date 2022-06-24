import * as React from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import Image from 'next/image';

import { colors } from '@ui-kit/Theme/colors';
import { theme } from '@ui-kit/Theme';

interface Props {
  fontSize?: string;
}

const useStyles = makeStyles({
  logo: {
    width: '32px',
    margin: theme.spacing(0, 0.5),
    boxSizing: 'border-box',
  },
});

export const DailyDeskLogo: React.FC<Props> = ({ fontSize = '16px' }) => {
  const styles = useStyles();
  return (
    <Box pl={2} pr={2} pt={4} pb={4}>
      <Grid container justify={'center'} alignItems={'center'}>
        <Grid container item xs={2}>
          <Image src={'/work-systems.png'} height={'32px'} width={'32px'} />
        </Grid>
        {/*<Grid item>*/}
        {/*  <Typography variant="subtitle2" style={{ color: colors.BLACK, fontSize }}>*/}
        {/*    {'daily'}*/}
        {/*  </Typography>*/}
        {/*</Grid>*/}
        <Grid item style={{ marginLeft: theme.spacing(1) }}>
          <Typography
            variant="subtitle2"
            style={{ color: colors.BLACK, fontSize, fontWeight: theme.typography.fontWeightBold }}
          >
            {'worksystems'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
