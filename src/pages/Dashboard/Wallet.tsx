import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';

import UploadReceipt from '../../components/Wallet/UploadReceipt';
import useTitle from '../../hooks/use-title';

import { ReactComponent as UploadReceiptIcon } from '../../static/svg/upload-receipt.svg';
import { ReactComponent as CareCardIcon } from '../../static/svg/care-card.svg';

const GridItem = styled(Box)(({ theme }) => ({
  // ...theme.typography.body2,
  backgroundColor: '#ffffff',
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  flex: '1 1 auto',
  display: 'flex',
  justifyContent: 'center'
}));

const Wallet = (props: { title: string }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  useTitle(props.title);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div>
        <Typography variant="h1" align="center" color="primary" gutterBottom>
          My Care Wallet
        </Typography>
        <Typography variant="body1" align="center" color="#9C9C9C" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </Typography>
        <Paper
          sx={{
            p: 2,
            mt: 6,
            borderRadius: 2
          }}>
          <Typography
            variant="subtitle1"
            align="center"
            color="primary"
            fontWeight={'bold'}
            gutterBottom>
            Personal Care Wallet Credit Breakdown
          </Typography>

          <Divider
            variant="middle"
            sx={{
              my: 1.5
            }}
          />

          <Stack
            direction="row"
            alignItems={'center'}
            divider={
              <Divider orientation="vertical" variant="middle" flexItem />
            }
            spacing={2}>
            <GridItem>
              <Box>
                <Typography variant="body2" fontSize={12} color="primary">
                  Monthly Credit
                </Typography>
                <Typography variant="h4" fontSize={36} color="primary">
                  $83.00
                </Typography>
              </Box>
            </GridItem>
            <GridItem>
              <Box>
                <Typography variant="body2" fontSize={12} color="#BDBDBD">
                  Credit Balance
                </Typography>
                <Typography variant="h4" fontSize={36} color="#BDBDBD">
                  $0.00
                </Typography>
              </Box>
            </GridItem>
            <GridItem>
              <Box>
                <Typography variant="body2" fontSize={12} color="#BDBDBD">
                  Total Payout
                </Typography>
                <Typography variant="h4" fontSize={36} color="#BDBDBD">
                  $0.00
                </Typography>
              </Box>
            </GridItem>
          </Stack>
        </Paper>

        <Box
          height={300}
          width="100%"
          border={'thin'}
          borderColor={(theme) => theme.palette.grey[900]}
          borderRadius={2}
          mt={6}
          sx={{
            borderStyle: 'dashed'
          }}>
          <Stack
            direction="row"
            alignItems={'center'}
            height="100%"
            divider={
              <Divider orientation="vertical" variant="middle" flexItem />
            }
            spacing={2}>
            <Box
              component={'button'}
              flexBasis={'50%'}
              sx={{
                '&:focus': {
                  outline: 'none'
                },
                '&:active': {
                  outline: 'none'
                }
              }}
              onClick={handleClickOpen}>
              <Typography
                variant="h3"
                align="center"
                color="#28404A"
                gutterBottom>
                Upload Your Receipt
              </Typography>

              <Box
                border={5}
                borderColor="#E5E5E5"
                p={3}
                width={200}
                textAlign="center"
                borderRadius={(theme) => theme.shape.borderRadius}
                mt={3}
                mx="auto"
                sx={{
                  '& svg': {
                    margin: 'auto'
                  }
                }}>
                <UploadReceiptIcon />
                <MuiLink component={'p'} variant="body2" mt={2}>
                  Upload receipt
                </MuiLink>
              </Box>
            </Box>
            <Box
              component={'button'}
              flexBasis={'50%'}
              sx={{
                '&:focus': {
                  outline: 'none'
                },
                '&:active': {
                  outline: 'none'
                }
              }}>
              <Typography
                variant="h3"
                align="center"
                color="#28404A"
                gutterBottom>
                Link your account
              </Typography>

              <Box
                border={5}
                borderColor="#E5E5E5"
                p={3}
                width={200}
                textAlign="center"
                borderRadius={(theme) => theme.shape.borderRadius}
                mt={3}
                mx="auto"
                sx={{
                  '& svg': {
                    margin: 'auto'
                  }
                }}>
                <CareCardIcon />
                <MuiLink component={'p'} variant="body2" mt={2}>
                  Link account
                </MuiLink>
              </Box>
            </Box>
          </Stack>
        </Box>
      </div>

      {open && <UploadReceipt open={open} onClose={handleClose} />}
    </React.Fragment>
  );
};

export default Wallet;
