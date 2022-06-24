import React, { FC, useEffect, useState } from 'react';
import { Grid, makeStyles, Slide, Typography } from '@material-ui/core';
import { theme } from '@ui-kit/Theme';
import { Selected } from '@shared/ProjectPicker/Selected';
import { ListItem } from '@shared/ProjectPicker/ListItem';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { RenderConditionally } from '@shared/utils/RenderConditionally';
import { LoadingState } from '@shared/Loading/LoadingState';
import { Project } from '@store/project';

const useStyles = makeStyles({
  container: {
    overflow: 'visible',
  },
  listContainer: {
    position: 'relative',
    background: theme.palette.common.white,
    padding: theme.spacing(1, 0),
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;',
    borderRadius: '16px',
    top: '8px',
  },
  list: {
    height: '258px',
    overflow: 'scroll',
    background: theme.palette.common.white,
  },
});

export const ProjectPicker: FC = () => {
  const { isLoading, list: projects } = useSelector((state: RootState) => state.project);

  const [selected, setSelected] = useState(projects?.[0]);
  const [open, setOpen] = useState(false);
  const styles = useStyles();

  const handleOnSelect = (project: Project) => {
    setSelected(project);
    setOpen(false);
  };

  useEffect(() => {
    setSelected(projects?.[0]);
  }, [projects]);
  if (isLoading) return <LoadingState />;

  return (
    <Grid container className={styles.container}>
      <Grid container>
        <RenderConditionally basedOn={!!selected}>
          <Selected onClick={() => setOpen(!open)} selected={selected} />
        </RenderConditionally>
      </Grid>
      <Slide in={open}>
        <Grid container className={styles.listContainer}>
          <Grid container className={styles.list}>
            {projects.map((project) => {
              return (
                <Grid container key={project.id}>
                  <ListItem onClick={() => handleOnSelect(project)} name={project.name} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Slide>
    </Grid>
  );
};
