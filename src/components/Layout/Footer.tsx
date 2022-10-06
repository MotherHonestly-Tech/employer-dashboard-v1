import { Box, Grid, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as FooterIcon } from '../../static/svg/logo-mh.svg';
import MHLogo from '../../theme/icons/MHLogo';

type Props = {};

const Footer = (props: Props) => {
  return (
    <Fragment>
      <Box className="bg-lilac-300 h-auto w-full">
        {/* <Grid container spacing={1} columns={24} className="gap-40"> */}

        <Grid container spacing={2} className="py-4 px-12">
          <Grid item xs={6} className="">
            <Box className="flex relative w-full p-2">
              <Typography className="bottom-0 left-0 absolute">
                2022 Mother Honestly, All Rights Reserved
              </Typography>
              <Link to={'/'}>
                <Typography className="bottom-0 w-full left-80 absolute">
                  Privacy Policy
                </Typography>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} className="">
            <Box className="flex relative w-full p-2">
              <Typography className="bottom-0 right-12 absolute">
                Powered by Mother Honestly &nbsp; {' '}
                <MHLogo
                  style={{
                    width: '2rem',
                    display: 'inline',
                    verticalAlign: 'middle'
                  }}
                />
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default Footer;
