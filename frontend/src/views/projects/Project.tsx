import React, { FC, useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectOverview } from '@views/projects/overview/ProjectOverview';
import { setCurrentProject } from '@store/project/projects-thunk';
import { useRouter } from 'next/router';

const useStyles = makeStyles({});

export const Project: FC = () => {
  const styles = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const projectId = router.query?.id as string;

  useEffect(() => {
    dispatch(setCurrentProject(projectId));
  }, []);

  return (
    <Grid container style={{ height: '100%' }}>
      <ProjectOverview />
    </Grid>
  );
};
