import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

import MHButton from '../Button/MHButton';
import MHDialog from '../Dialog/MHDialog';

const MerchantDialog = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <React.Fragment>
      <MHDialog
        open={open}
        title={' '}
        handleClose={onClose}
        scroll="paper"
        actions={null}
        maxWidth={'md'}
        closeiconcolor="#ffffff"
        fullWidth>
        <Box component={'section'} minHeight="140px">
          <Box
            position="absolute"
            width="100%"
            top="0"
            left="0"
            sx={{
              '& > img': {
                objectFit: 'cover',
                objectPosition: 'center'
              }
            }}>
            <img
              src="https://res.cloudinary.com/mother-honestly/image/upload/v1664700768/nathan-anderson-FHiJWoBodrs-unsplash_1_irafm3.png"
              alt="Merchant"
            />
          </Box>
        </Box>

        <Box px={2}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              width: '100%',
              position: 'relative',
              zIndex: 999
            }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Avatar
                  src="https://res.cloudinary.com/mother-honestly/image/upload/v1664696754/277775504_4990737387679970_1961644617242490669_n_1_pgcwpo.svg"
                  variant="rounded"
                  sx={{
                    width: 64,
                    height: 64,
                    mx: 'auto',
                    transform: 'translateY(-40px)'
                  }}
                />

                <Typography
                  variant="body1"
                  align="center"
                  color="primary.main"
                  fontSize="1.1rem">
                  15% Off
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color="#989898"
                  fontSize=".7rem"
                  paragraph>
                  15% off your purchase
                </Typography>

                <Typography
                  variant="subtitle1"
                  align="center"
                  color="primary.main"
                  paragraph>
                  ** Use code: MHPAPA22
                </Typography>

                <Divider variant="middle" light />

                <MHButton
                  sx={{
                    mt: 2
                  }}
                  onClick={() => window.open('https://www.papa.com/', '_blank')}
                  fullWidth>
                  Shop
                </MHButton>
              </Grid>
              <Grid item xs={6}>
                <Typography color="#000000" variant="body2">
                  Papa helps health plans and employers connect members and
                  their families to real people for help with companionship,
                  everyday tasks, transportation, and more. It’s vital human
                  connection, right to the front door.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </MHDialog>
    </React.Fragment>
  );
};

export default MerchantDialog;
