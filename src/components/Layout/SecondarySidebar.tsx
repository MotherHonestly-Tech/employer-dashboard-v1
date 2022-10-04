import React from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

import { MerchantList } from '../Dashboard/MerchantList';
import { CategoryList } from '../Dashboard/CategoryList';

import { ReactComponent as ArrowBtnIcon } from '../../static/svg/arrow-btn.svg';
import { DRAWER_WIDTH } from '../../utils/constants';
import { FnComponent } from '../../models/component.model';

const SideDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'sticky',
    width: `${DRAWER_WIDTH + 60}px`,
    height: '100vh',
    padding: theme.spacing(2),
    // background: '#F1F7F8'  #ebf6f7,
    background: '#eaf6f7',
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
    }),
    '&::-webkit-scrollbar': {
      width: '8px',
      borderRadius: '15px'
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
      borderRadius: '15px'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#C8C8C8',
      width: '8px',
      borderRadius: '15px'
    }
  }
}));

const SecondarySidebar: FnComponent = () => {
  const location = useLocation(); // window.location
  const walletMatch = matchPath(location.pathname, {
    path: '/organization/wallet',
    exact: true,
    strict: false
  });

  return (
    <SideDrawer variant="permanent" open={true}>
      <Toolbar
        sx={{
          mb: 1
        }}
      />
      <Box display="flex" flexDirection={'column'} height="100%">
        {walletMatch ? <CategoryList /> : <MerchantList />}

        <Divider
          variant="fullWidth"
          light
          sx={{
            borderColor: '#E8E8E8',
            my: 2
          }}
        />

        <Typography
          variant="body2"
          color="#28404A"
          fontSize={'.7rem'}
          gutterBottom
          mb={2}>
          Are you joggling different tasks and still can't find time to do the
          needful.
        </Typography>

        <Typography
          variant="body2"
          color="#28404A"
          fontSize={'.7rem'}
          gutterBottom
          mb={2}>
          Lets take some tasks off from your plate.
        </Typography>

        <ListItem
          component="button"
          disableGutters
          secondaryAction={<ArrowBtnIcon />}>
          <ListItemText sx={{ color: '#28404A', verticalAlign: 'middle' }}>
            <Typography variant="body2" color="#28404A" fontFamily="Area-Normal-Bold">
              Talk to a Concierge Today!
            </Typography>
          </ListItemText>
        </ListItem>
      </Box>
    </SideDrawer>
  );
};

export default SecondarySidebar;
