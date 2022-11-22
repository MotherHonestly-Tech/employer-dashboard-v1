import React from 'react';
import { matchPath } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

import AppBar from './AppBar';
import Sidebar from './MainSidebar';

import { FnComponent } from '../../models/component.model';

const Layout: FnComponent = (props) => {
  return (
    <Box>
      <AppBar />

      <Stack direction="row" component={'main'}>
        <Sidebar />

        <Box
          sx={{
            // backgroundColor: (theme) => '#fefefe',
            backgroundColor: (theme) => '#ffffff',
            flexGrow: 1,
            overflowY: 'auto',
            overflowX: 'hidden'
          }}>
          <Toolbar />
          {props.children}
        </Box>
      </Stack>
    </Box>
  );
};

export default Layout;
