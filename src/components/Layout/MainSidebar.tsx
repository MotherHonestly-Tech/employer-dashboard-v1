import React from 'react';
import { NavLink } from 'react-router-dom';

import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

import { ReactComponent as DashboardIcon } from '../../static/svg/dashboard.svg';
import { ReactComponent as WalletIcon } from '../../static/svg/wallet.svg';
import { ReactComponent as MerchantIcon } from '../../static/svg/merchant.svg';
import { ReactComponent as ResourcesIcon } from '../../static/svg/resources.svg';
import { ReactComponent as CoachingIcon } from '../../static/svg/coaching.svg';
import { ReactComponent as ConnectIcon } from '../../static/svg/connect.svg';
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
    background: theme.palette.common.white,
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
  // '&:before': {
  //   content: '""',
  //   position: 'absolute',
  //   height: 52,
  //   display: 'block',
  //   left: 0,
  //   top: 0,
  //   width: 6,
  //   backgroundColor: theme.palette.primary.main,
  //   borderTopRightRadius: '.4rem',
  //   borderBottomRightRadius: '.4rem',
  //   transition: '0.5s',
  //   transform: 'translateY(0)'
  // },
  // '& .MuiListItem-root.active:nth-child(2) ~ &:after': {
  //   transform: 'translateY(52px)'
  // }
}));

const Indicator = styled('div')(({ theme }) => ({
  position: 'absolute',
  height: 52,
  display: 'block',
  left: 0,
  top: 0,
  width: 5,
  backgroundColor: theme.palette.primary.main,
  borderTopRightRadius: '.4rem',
  borderBottomRightRadius: '.4rem',
  transition: '0.5s',
  transform: 'translateY(0)',
  '.MuiListItem-root.active:nth-of-type(2) ~ &': {
    transform: `translateY(${52}px)`
  },
  '.MuiListItem-root.active:nth-of-type(3) ~ &': {
    transform: `translateY(${52 * 2}px)`
  },
  '.MuiListItem-root.active:nth-of-type(4) ~ &': {
    transform: `translateY(${52 * 3}px)`
  },
  '.MuiListItem-root.active:nth-of-type(5) ~ &': {
    transform: `translateY(${52 * 4}px)`
  },
  '.MuiListItem-root.active:nth-of-type(6) ~ &': {
    transform: `translateY(${52 * 5}px)`
  },
  '.MuiListItem-root.active:nth-of-type(7) ~ &': {
    transform: `translateY(${52 * 6}px)`
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
          icon={<DashboardIcon />}
          primary="Dashboard"
          to="/organization/dashboard"
        />
        <RouterLink
          icon={<WalletIcon />}
          primary="Wallet"
          to="/organization/wallet"
        />
        <RouterLink
          icon={<MerchantIcon />}
          primary="Merchants"
          to="/organization/merchants"
        />
        <RouterLink
          icon={<ResourcesIcon />}
          primary="Resources"
          to="/organization/resources"
        />
        <RouterLink
          icon={<CoachingIcon />}
          primary="1:1 Coaching"
          to="/organization/coaching"
        />
        <RouterLink
          icon={<ConnectIcon />}
          primary="1:1 Connect"
          to="/organization/connect"
        />
        {/* <RouterLink icon={<WalletIcon />} primary="Wallet" to="/wallet" /> */}
        <Indicator />
      </ListStyled>
    </SideDrawer>
  );
};

export default MainSidebar;
