import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

import AppBar from './AppBar';
import Sidebar from './MainSidebar';
import SecondarySidebar from './SecondarySidebar';

import { FnComponent } from '../../models/component.model';

const Layout: FnComponent = (props) => {
  return (
    <Box>
      <AppBar />

      <Stack direction="row" component={'main'}>
        <Sidebar />

        <Box
          sx={{
            backgroundColor: (theme) => '#fefefe',
            flexGrow: 1,
            overflow: 'auto'
          }}>
          <Toolbar />
          {props.children}
        </Box>

        <SecondarySidebar />
      </Stack>
    </Box>
  );
};

export default Layout;
