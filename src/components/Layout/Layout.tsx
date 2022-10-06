import React from 'react';
import { matchPath } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

import AppBar from './AppBar';
import Sidebar from './MainSidebar';
import SecondarySidebar from './SecondarySidebar';

import { FnComponent } from '../../models/component.model';

const Layout: FnComponent = (props) => {
  const resourcePathMatch = matchPath(window.location.pathname, {
    path: '/organization/resources',
    exact: false,
    strict: false
  });

  const merchantsPathMatch = matchPath(window.location.pathname, {
    path: '/organization/merchants',
    exact: false,
    strict: false
  });

  const allowedPathMatches = [resourcePathMatch, merchantsPathMatch];

  const renderSecSidebar = function (): boolean {
    if (resourcePathMatch || merchantsPathMatch) {
      return false;
    }
    return true;
  };

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
            overflow: 'auto'
          }}>
          <Toolbar />
          {props.children}
        </Box>

        {renderSecSidebar() && <SecondarySidebar />}
      </Stack>
    </Box>
  );
};

export default Layout;
