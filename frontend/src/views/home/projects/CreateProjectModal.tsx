import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';

import { theme } from '@ui-kit/Theme';
import { CreateProject, CreateProjectForm } from '@views/home/projects/CreateProjectForm';
import { createProject } from '@store/project/projects-thunk';
import { Modal } from '@ui-kit/Modal/Modal';

const useStyles = makeStyles({
  container: {
    background: theme.palette.common.white,
    padding: theme.spacing(2),
    width: '480px',
    borderRadius: '24px',
  },
});

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const onCreateProject = async ({ name }: CreateProject) => {
    await dispatch(createProject({ name }));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
        <Grid container className={styles.container}>
          <CreateProjectForm onSubmit={onCreateProject} />
        </Grid>
      </Grid>
    </Modal>
  );
};
