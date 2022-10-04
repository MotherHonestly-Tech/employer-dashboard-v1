import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

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
        maxWidth={'sm'}
        closeiconcolor="#ffffff"
        fullWidth>
        <Box component={'section'} height="200px">
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

        <Box p={3}>
          <Stack direction="row" boxShadow="0px 4px 14px 0px #84848440">
                <Paper >

                </Paper>
          </Stack>
        </Box>
      </MHDialog>
    </React.Fragment>
  );
};

export default MerchantDialog;
