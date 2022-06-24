import React, { FC } from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { getRandomThemeColor } from '@shared/utils/ColorUtils';
import { RiArrowDownSLine } from 'react-icons/ri';
import { RiArrowUpSLine } from 'react-icons/ri';
import { theme } from '@ui-kit/Theme';

interface StyleProps {
  main: boolean;
  name: string;
}
const useStyles = makeStyles({
  container: ({ main }: StyleProps) => ({
    height: '64px',
    background: theme.palette.common.white,
    cursor: 'pointer',
    '&:hover': {
      border: main ? `solid 2px ${theme.palette.primary.main}` : 'none',
    },
  }),
  projectIcon: ({ name }: StyleProps) => ({
    height: '40px',
    width: '40px',
    backgroundColor: getRandomThemeColor(name),
    borderRadius: '100%',
  }),
  name: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  arrows: {
    height: '16px',
  },
});

interface Props {
  name: string;
  onClick: () => void;
  main?: boolean;
}

export const ListItem: FC<Props> = ({ name, onClick, main = false }) => {
  const styles = useStyles({ name, main });
  return (
    <Grid container className={styles.container} onClick={onClick}>
      <Grid container item xs={3} justify={'center'} alignItems={'center'}>
        <Grid
          container
          item
          justify={'center'}
          alignItems={'center'}
          className={styles.projectIcon}
        >
          <Typography style={{ color: theme.palette.common.white }}>{'NM'}</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={8} alignItems={'center'} justify={'flex-start'}>
        <Box pl={1}>
          <Typography className={styles.name}>{name}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
