import React from 'react';
import { NavLink } from 'react-router-dom';

import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

import { ReactComponent as InsightsIcon } from '../../static/svg/insights.svg';
import { ReactComponent as CloudUploadIcon } from '../../static/svg/cloud-upload.svg';
import { ReactComponent as WalletIcon } from '../../static/svg/wallet.svg';
import { ReactComponent as MemberIcon } from '../../static/svg/member.svg';
import { ReactComponent as ResourcesIcon } from '../../static/svg/resources.svg';
import { DRAWER_WIDTH } from '../../utils/constants';
import { FnComponent } from '../../models/component.model';

interface RouterLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

const SideDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'sticky',
    whiteSpace: 'nowrap',
    width: DRAWER_WIDTH,
    height: '100vh',
    paddingTop: theme.spacing(5),
    background: '#F8F8F8',
    borderWidth: 0,
    boxShadow: '2px 4px 4px 0px #B7B7B740',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}));

const ListStyled = styled(
  List,
  {}
)<{
  component?: React.ElementType;
}>(({ theme }) => ({
}));

const Indicator = styled('div')(({ theme }) => ({
  position: 'absolute',
  height: 52,
  display: 'block',
  left: '50%',
  top: 0,
  width: '90%',
  backgroundColor: theme.palette.common.white,
  zIndex: -10,
  borderRadius: '.4rem',
  transition: '0.5s',
  boxShadow: '0px 1px 4px rgba(203, 203, 203, 0.25)',
  transform: 'translate(-50%, 0)',
  '.MuiListItem-root.active:nth-of-type(2) ~ &': {
    transform: `translate(-50%, ${52}px)`
  },
  '.MuiListItem-root.active:nth-of-type(3) ~ &': {
    transform: `translate(-50%, ${52 * 2}px)`
  },
  '.MuiListItem-root.active:nth-of-type(4) ~ &': {
    transform: `translate(-50%, ${52 * 3}px)`
  }
}));

const ListItemStyled = styled(ListItem)<{
  component?: React.ElementType;
  to: string;
}>(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  height: 52
}));

const RouterLink = (props: RouterLinkProps) => {
  const { icon, primary, to } = props;

  return (
    <ListItemStyled
      component={NavLink}
      to={to}
      alignItems="center"
      sx={{
        px: 3,
        '& svg': {
          color: 'secondary.light',
          transition: '0.5s',
          transform: 'translateX(0) rotate(0)'
        },
        '&.active svg': {
          color: 'primary.main',
          transition: '.5s'
        },
        '&:hover': {
          textDecoration: 'none'
        },
        '&.active:after': {
          content: '""',
          position: 'absolute',
          height: '100%',
          display: 'block',
          zIndex: 1,
          left: 0,
          top: 0,
          width: 6,
          // bgcolor: 'primary.main',
          borderTopRightRadius: '.4rem',
          borderBottomRightRadius: '.4rem'
        }
      }}>
      <ListItemIcon
        sx={{
          minWidth: 40
        }}>
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={primary}
        primaryTypographyProps={{
          sx: {
            color: 'secondary.light',
            '.active &': {
              color: 'primary.main'
            },
            transition: '0.5s'
          }
        }}
      />
    </ListItemStyled>
  );
};

const MainSidebar: FnComponent<{ sx?: object }> = ({ sx }) => {
  return (
    <SideDrawer variant="permanent" open={true} sx={{ ...sx }}>
      <Toolbar />

      <ListStyled component="nav" sx={{}} disablePadding>
        {/* <ListItem component={NavLink} to="/organization/dashboard"></ListItem> */}

        <RouterLink
          icon={<InsightsIcon />}
          primary="Insights"
          to="/organization/dashboard"
        />
        <RouterLink
          icon={<CloudUploadIcon />}
          primary="Employees"
          to="/organization/employees"
        />
        <RouterLink
          icon={<WalletIcon />}
          primary="Wallet"
          to="/organization/wallet"
        />
        <RouterLink
          icon={<MemberIcon />}
          primary="Members"
          to="/organization/team-members"
        />
        <RouterLink
          icon={<ResourcesIcon />}
          primary="Resources"
          to="/organization/resources"
        />
        {/* <RouterLink icon={<WalletIcon />} primary="Wallet" to="/wallet" /> */}
        <Indicator />
      </ListStyled>
    </SideDrawer>
  );
};

export default MainSidebar;
