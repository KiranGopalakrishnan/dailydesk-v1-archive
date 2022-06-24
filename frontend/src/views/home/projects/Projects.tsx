import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import { ProjectItem } from '@views/home/projects/ProjectItem';
import { theme } from '@ui-kit/Theme';
import { colors } from '@ui-kit/Theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store';
import { fetchProjects } from '@store/project/projects-thunk';
import { Project } from '@store/project';
import { routes } from '@config/routes';
import { WithSidebar } from '@shared/Sidebar/WithSidebar';

const useStyles = makeStyles({
  container: {
    padding: theme.spacing(0, 8),
    backgroundColor: colors.GREY_6,
  },
  title: {
    padding: theme.spacing(4, 0),
    height: '100px',
    borderBottom: `solid 1px ${colors.GREY_4}`,
  },
  projectsContainer: {
    padding: theme.spacing(2, 0),
  },
});

const getProjectLink = (id: Project['id']) => {
  return routes.PROJECT_OVERVIEW.as({ id });
};

export const Projects: FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const projects = useSelector((root: RootState) => root.project.list);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <WithSidebar>
      <Grid container className={styles.container} alignItems={'flex-start'}>
        <Grid container>
          <Grid container justify="space-between" className={styles.title}>
            <Box>
              <Typography variant={'h4'}>{'Projects'}</Typography>
            </Box>
          </Grid>
          <Box>
            <Grid container className={styles.projectsContainer}>
              {projects.map((project) => (
                <Box mr={4} key={project.id}>
                  <Link href={getProjectLink(project.id)}>
                    <ProjectItem key={project.id} project={project} />
                  </Link>
                </Box>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </WithSidebar>
  );
};
