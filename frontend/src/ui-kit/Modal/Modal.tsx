import React, { ReactElement } from 'react';
import { Box, Grid, makeStyles, Modal as MUIModal } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { theme } from '@ui-kit/Theme';

const useStyles = makeStyles({
  container: {
    background: theme.palette.common.white,
    padding: theme.spacing(2),
    width: '480px',
    borderRadius: '24px',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    right: '16px',
    top: '16px',
    cursor: 'pointer',
  },
});

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  const styles = useStyles();

  return (
    <MUIModal open={isOpen}>
      <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
        <Grid container className={styles.container}>
          <Box className={styles.closeIcon} onClick={onClose}>
            <CloseIcon />
          </Box>
          {children}
        </Grid>
      </Grid>
    </MUIModal>
  );
};
