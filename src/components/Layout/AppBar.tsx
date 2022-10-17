import * as React from 'react';

import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

import SearchField from '../Form/SearchField';
import MHPrimaryLogo from '../../theme/icons/MHPrimaryLogo';
import MHLogo from '../../theme/icons/MHLogo';
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
  const { user, logout } = authCtx;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarStyled position="fixed" open={true}>
        <Toolbar>
          <Box aria-label="menu" sx={{ ml: 5 }} flexGrow={1}>
            {/* <MHPrimaryLogo className="mx-0" /> */}
            <MHLogo style={{ width: '3.4rem' }} />
          </Box>

          <Stack direction="row" alignItems="center" spacing={6}>
            <div className="relative">
              <BellIcon title="notification" width="1.3rem" />
              <span className="absolute flex h-3 w-3 -top-0.5 -right-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2EC2C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F2EC2C]"></span>
              </span>
            </div>

            <IconButtonUnstyled
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}>
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <Avatar
                  alt="Avatar"
                  src="https://res.cloudinary.com/mother-honestly/image/upload/v1657976885/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash_dxhylh.png"
                  variant="rounded"
                  sx={{}}
                />
                <Typography color="primary">
                  {user?.firstName}&nbsp;
                  {user?.lastName}
                </Typography>

                <CaretDownIcon />
              </Stack>
            </IconButtonUnstyled>

            <Menu
              id="app-bar-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBarStyled>
    </Box>
  );
};

export default AppBar;
