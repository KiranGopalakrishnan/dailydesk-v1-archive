import React, { FC } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import stc from 'string-to-color';
import { colors } from '@ui-kit/Theme/colors';
import { theme } from '@ui-kit/Theme';
import { getRandomThemeColor } from '@shared/utils/ColorUtils';

const useStyles = makeStyles({
  container: ({ name }: { name: string }) => ({
    width: '120px',
    height: '120px',
    borderTop: `solid 12px ${getRandomThemeColor(name)}`,
    cursor: 'pointer',
    padding: theme.spacing(2),
    background: theme.palette.common.white,
    boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
    borderRadius: '8px',
  }),
});

export const ProjectItem: FC<{ project: any }> = ({ project }) => {
  const styles = useStyles({ name: project.name });
  return (
    <Grid container className={styles.container} justify="center" alignItems="center">
      <Typography variant="subtitle2" align="center">
        {project.name}
      </Typography>
    </Grid>
  );
};
