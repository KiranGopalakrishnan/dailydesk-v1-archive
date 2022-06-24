import React, { FC, useState } from 'react';
import { Grid, makeStyles, Slide } from '@material-ui/core';
import { Sidebar } from '@shared/Sidebar/Sidebar';
import { theme } from '@ui-kit/Theme';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MiniSidebar } from '@shared/Sidebar/MiniSidebar';
import { RenderConditionally } from '@shared/utils/RenderConditionally';
import { CreateProjectModal } from '@views/home/projects/CreateProjectModal';

interface Props {}

const useStyles = makeStyles({
  container: {
    height: '100%',
    overflowX: 'hidden',
  },
  sidebar: ({ collapsed }: { collapsed: boolean }) => ({
    height: 'auto',
    position: 'fixed',
    top: '0',
    left: 0,
    bottom: 0,
    right: 0,
    width: collapsed ? '80px' : '280px',
  }),
  componentContainer: {
    position: 'relative',
    left: '280px',
    width: 'calc(100vw - 280px)',
  },
  collapseIcon: {
    position: 'absolute',
    top: '100px',
    right: '-20px',
    height: '40px',
    width: '40px',
    background: theme.palette.primary.main,
    borderRadius: '100%',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;',
    cursor: 'pointer',
  },
});

export const WithSidebar: FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  const styles = useStyles({ collapsed });

  const Icon = collapsed ? IoIosArrowForward : IoIosArrowBack;

  const handleCollapsed = () => {
    setCollapsed(true);
  };

  const handleExpanded = () => {
    setCollapsed(false);
  };

  const handleCreateProjectClick = () => {
    setIsCreateProjectOpen(true);
  };

  const shouldShowFullSidebar = !collapsed;
  const shouldShowMiniSidebar = collapsed;

  return (
    <Grid container className={styles.container} direction={'row'}>
      <Grid item container className={styles.sidebar}>
        <RenderConditionally basedOn={shouldShowFullSidebar}>
          <Slide in={shouldShowFullSidebar} direction={'right'} mountOnEnter unmountOnExit>
            <Grid container direction={'column'}>
              {/*<Grid*/}
              {/*  container*/}
              {/*  justify={'center'}*/}
              {/*  alignItems={'center'}*/}
              {/*  className={styles.collapseIcon}*/}
              {/*  onClick={handleCollapsed}*/}
              {/*>*/}
              {/*  <Icon size={24} color={theme.palette.primary.dark} />*/}
              {/*</Grid>*/}
              <Sidebar
                onCollapse={() => setCollapsed(!collapsed)}
                collapsed={collapsed}
                onCreateProject={handleCreateProjectClick}
              />
            </Grid>
          </Slide>
        </RenderConditionally>

        <RenderConditionally basedOn={shouldShowMiniSidebar}>
          <Slide in={shouldShowMiniSidebar} direction={'right'} mountOnEnter unmountOnExit>
            <Grid container>
              <Grid
                container
                justify={'center'}
                alignItems={'center'}
                className={styles.collapseIcon}
                onClick={handleExpanded}
              >
                <Icon size={24} color={theme.palette.primary.dark} />
              </Grid>
              <MiniSidebar />
            </Grid>
          </Slide>
        </RenderConditionally>
      </Grid>
      <Grid item container className={styles.componentContainer}>
        {children}
      </Grid>
      <RenderConditionally basedOn={isCreateProjectOpen}>
        <CreateProjectModal
          isOpen={isCreateProjectOpen}
          onClose={() => setIsCreateProjectOpen(false)}
        />
      </RenderConditionally>
    </Grid>
  );
};
