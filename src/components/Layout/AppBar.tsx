import * as React from 'react';

import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

import SearchField from '../Form/SearchField';
import MHPrimaryLogo from '../../theme/icons/MHPrimaryLogo';
import IconButtonUnstyled from '../Button/IconButtonStyled';

import { ReactComponent as OrgLogo } from '../../static/svg/unilever-logo.svg';
import { ReactComponent as ArrowRightIcon } from '../../static/svg/arrow-right-thick.svg';
import { ReactComponent as BellIcon } from '../../static/svg/notification-bell.svg';
import { ReactComponent as CaretDownIcon } from '../../static/svg/caret-down.svg';
import AuthContext from '../../store/context/auth-context';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop: any) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1000,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const AppBar = () => {
  const authCtx = React.useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarStyled position="fixed" open={true}>
        <Toolbar>
          <Box aria-label="menu" sx={{ ml: 5 }} flexGrow={1}>
            {/* <MHPrimaryLogo className="mx-0" /> */}
            <OrgLogo />
          </Box>

          <Stack direction="row" alignItems="center" spacing={6}>
            <SearchField
              icon={<ArrowRightIcon />}
              placeholder="Select an interest"
            />

            <BellIcon title="notification" width="1.3rem" />

            <IconButtonUnstyled>
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <Avatar
                  alt="Avatar"
                  src="https://res.cloudinary.com/mother-honestly/image/upload/v1657976885/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash_dxhylh.png"
                  variant="rounded"
                  sx={{}}
                />
                <Typography color="primary">
                  {authCtx.user?.firstName}&nbsp;
                  {authCtx.user?.lastName}
                </Typography>

                <CaretDownIcon />
              </Stack>
            </IconButtonUnstyled>
          </Stack>
        </Toolbar>
      </AppBarStyled>
    </Box>
  );
};

export default AppBar;
