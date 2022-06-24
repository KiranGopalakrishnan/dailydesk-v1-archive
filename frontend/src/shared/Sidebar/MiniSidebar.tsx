import React, { FC } from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { colors } from '@ui-kit/Theme/colors';
import { theme } from '@ui-kit/Theme';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaTasks } from 'react-icons/fa';
import { RiSettings4Fill } from 'react-icons/ri';

interface Props {}

const useStyles = makeStyles({
  container: {
    backgroundColor: colors.GREY_BG,
    borderRight: `solid 1px ${colors.GREY_7}`,
  },
  menuItem: {
    borderBottom: `solid 1px ${colors.GREY_5}`,
    '& :last-child': {
      borderBottom: 'none',
    },
  },
});

export const MiniSidebar: FC<Props> = () => {
  const styles = useStyles();
  return (
    <Grid container className={styles.container} justify={'flex-start'} direction={'column'}>
      <Grid container justify={'center'} className={styles.menuItem}>
        <Box pt={2} pb={2}>
          <FaTasks size={24} color={theme.palette.primary.main} />
        </Box>
      </Grid>
      <Grid container justify={'center'} className={styles.menuItem}>
        <Box pt={2} pb={2}>
          <RiSettings4Fill size={24} color={theme.palette.primary.main} />
        </Box>
      </Grid>
    </Grid>
  );
};
