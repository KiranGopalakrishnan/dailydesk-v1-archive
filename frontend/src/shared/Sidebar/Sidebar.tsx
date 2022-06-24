import React, { FC } from 'react';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { theme, colors } from '@ui-kit/Theme';
import { ProjectPicker } from '@shared/ProjectPicker/ProjectPicker';
import { FaRegChartBar } from 'react-icons/fa';
import { GiCheckMark } from 'react-icons/gi';
import { AiOutlinePlus, AiTwotoneSetting } from 'react-icons/ai';
import { BiBarChartSquare } from 'react-icons/bi';
import { IoMdArrowDropright } from 'react-icons/io';
import { RiLineChartLine } from 'react-icons/ri';

interface Props {
  collapsed: boolean;
  onCollapse: () => void;
  onCreateProject: () => void;
}

const useStyles = makeStyles({
  container: {
    height: '100%',
    backgroundColor: colors.WHITE,
    borderRight: `solid 1px ${colors.GREY_5}`,
    boxSizing: 'border-box',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',
    // boxShadow:
    //   'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
  },
  menuItem: {
    height: '48px',
    width: '100%',
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(4),
    padding: theme.spacing(0, 2),
    marginRight: theme.spacing(4),
    cursor: 'pointer',
    '&:hover': {
      color: colors.GREY_4,
      background: theme.palette.common.white,
      borderRadius: '8px',
      // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
    },
    '& :last-child': {
      borderBottom: 'none',
    },
  },
  middleSection: {
    height: '70%',
  },
  mainSectionContainer: {
    height: '50%',
    backgroundColor: colors.GREY_BG,
    padding: theme.spacing(4, 2),
  },
  mainSection: {
    height: '30%',
    width: '100%',
  },
  bottomSection: {
    height: '10%',
  },
  secondSection: {
    height: '30%',
    marginTop: theme.spacing(3),
  },
  icon: {
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
});

interface MenuItemProps {
  text: string;
  color?: string;
}

const MenuItem: FC<MenuItemProps> = ({ children, text, color = colors.GREY_3 }) => {
  const styles = useStyles();
  return (
    <Grid container item justify={'flex-start'} alignItems={'center'} className={styles.menuItem}>
      {children}
      <Box pl={2}>
        <Typography
          align={'center'}
          variant="body1"
          style={{
            color,
            fontWeight: theme.typography.fontWeightMedium,
            fontFamily: "'Raleway', sans-serif",
          }}
        >
          {text}
        </Typography>
      </Box>
    </Grid>
  );
};

export const Sidebar: FC<Props> = ({ collapsed, onCollapse, onCreateProject }) => {
  const styles = useStyles();
  return (
    <Grid container className={styles.container} direction={'column'}>
      <Grid item container className={styles.mainSectionContainer}>
        <Grid item container className={styles.mainSection}>
          <Grid container>
            <ProjectPicker />
          </Grid>
        </Grid>
        <Grid
          container
          className={styles.middleSection}
          direction={'column'}
          justify={'flex-start'}
        >
          <Grid container>
            <MenuItem text={'Dashboard'}>
              <BiBarChartSquare size={24} color={colors.GREY_3} />
            </MenuItem>
          </Grid>
          <Grid container>
            <MenuItem text={'Boards'}>
              <GiCheckMark size={24} color={colors.GREY_3} />
            </MenuItem>
          </Grid>
          <Grid container>
            <MenuItem text={'Reports'}>
              <RiLineChartLine size={24} color={colors.GREY_3} />
            </MenuItem>
          </Grid>
          <Grid container>
            <MenuItem text={'Settings'}>
              <AiTwotoneSetting size={24} color={colors.GREY_3} />
            </MenuItem>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction={'column'} className={styles.secondSection}>
        <Grid container>
          <MenuItem text={'My tasks'} color={theme.palette.primary.main}>
            <IoMdArrowDropright size={24} color={theme.palette.primary.main} />
          </MenuItem>
        </Grid>
        <Grid container>
          <MenuItem text={'My meetings'} color={theme.palette.primary.main}>
            <IoMdArrowDropright size={24} color={theme.palette.primary.main} />
          </MenuItem>
        </Grid>
      </Grid>
      <Grid container className={styles.bottomSection} justify={'center'} alignItems={'flex-end'}>
        <Button type="submit" variant="contained" color="primary" onClick={onCreateProject}>
          <Grid item container xs={2} justify={'center'} alignItems={'flex-start'}>
            <AiOutlinePlus size={24} color={theme.palette.common.white} />
          </Grid>
          <Grid item container xs={10} justify={'center'} alignItems={'flex-start'}>
            {'New Project'}
          </Grid>
        </Button>
      </Grid>
    </Grid>
  );
};
