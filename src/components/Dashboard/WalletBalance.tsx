import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Zoom from '@mui/material/Zoom';
import { styled } from '@mui/material/styles';

import { ReactComponent as ArrowUpIcon } from '../../static/svg/arrow-up.svg';
import { ReactComponent as ArrowDownIcon } from '../../static/svg/arrow-down.svg';
import { ReactComponent as CashIcon } from '../../static/svg/cash.svg';
import DashedIcon from '../../theme/icons/DashedIcon';

const BackgroundOverlay = styled((props) => (
  <Box
    component="div"
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="215"
      height="186"
      viewBox="0 0 215 186"
      fill="none">
      <path
        d="M-93.9952 154.915C-94.5772 68.6657 -42.1951 3.39601 30.5578 -10.5903C102.729 -23.9939 188.286 19.7135 207.493 90.8107C224.371 153.166 212.731 216.105 173.153 270.302C169.079 276.13 163.841 280.792 158.021 285.454C114.369 322.168 42.1982 325.082 -11.3479 291.864C-64.8941 258.064 -91.0851 208.529 -93.9952 154.915Z"
        fill="url(#paint0_linear_384_2269)"
        fillOpacity="0.8"
      />
      <defs>
        <linearGradient
          id="paint0_linear_384_2269"
          x1="60.5"
          y1="-13"
          x2="60.5"
          y2="315"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="0.461632" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </Box>
))(({ theme }) => ({}));

const WalletBalance = () => {
  return (
    <Zoom in>
      <Box
        bgcolor={'#F4EE46'}
        borderRadius={(theme) => (theme.shape.borderRadius as number) - 2}
        position="relative"
        overflow={'hidden'}
        zIndex={1}
        py={2}
        height="100%"
        display="flex"
        flexDirection="column">
        <BackgroundOverlay />

        <Box
          position="relative"
          flexGrow={1}
          display="flex"
          flexDirection={'column'}
          justifyContent="center">
          {/* <DashedIcon
            sx={{
              position: 'absolute',
              left: '15%',
              top: 10
            }}>
            <CashIcon />
          </DashedIcon> */}

          <Typography
            align="center"
            variant="body1"
            gutterBottom
            sx={{
              color: '#194049',
              fontWeight: 600,
              fontSize: '1rem'
            }}>
            Work-Life Wallet Balance
          </Typography>
          <Typography
            align="center"
            variant="body1"
            gutterBottom
            sx={{
              color: '#194049',
              fontWeight: 600,
              fontSize: '1.5rem'
            }}>
            $320
          </Typography>
          <Typography
            align="center"
            variant="body1"
            sx={{
              color: '#898511',
              fontSize: '0.75rem',
              fontWeight: 500
            }}>
            -40.1%
          </Typography>
        </Box>

        <Grid container direction="row" px={2} mt={3}>
          <Grid item xs zeroMinWidth>
            <Stack direction="row" alignItems="center" spacing={0}>
              <ArrowUpIcon />
              <Typography
                variant="body2"
                align="left"
                noWrap
                ml={0.5}
                sx={{
                  color: '#898511',
                  fontSize: '0.65rem',
                  fontWeight: 500
                }}>
                Total Credit{' '}
                <Typography
                  component="span"
                  sx={{
                    display: 'inline',
                    font: 'inherit',
                    fontWeight: 600,
                    fontSize: '0.65rem'
                  }}>
                  600
                </Typography>{' '}
                USD
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={'flex-end'}
              spacing={0}>
              <ArrowDownIcon />
              <Typography
                variant="body2"
                noWrap
                ml={0.5}
                sx={{
                  color: '#898511',
                  fontSize: '0.65rem',
                  fontWeight: 500
                }}>
                Total Payout{' '}
                <Typography
                  component="span"
                  sx={{
                    display: 'inline',
                    font: 'inherit',
                    fontWeight: 600,
                    fontSize: '0.65rem'
                  }}>
                  280
                </Typography>{' '}
                USD
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Zoom>
  );
};

export default WalletBalance;
