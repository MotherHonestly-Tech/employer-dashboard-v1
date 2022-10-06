import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { styled, useTheme } from '@mui/material/styles';

import MerchantDialog from './MerchantDialog';

const Discount = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '14px',
  padding: '4px 9px',
  color: theme.palette.common.black,
  textAlign: 'center',
  position: 'absolute',
  top: '10px',
  right: '10px',
  pointerEvents: 'none',
  fontSize: '.6rem'
}));

const Merchant = ({
  bannerSrc,
  alt,
  iconSrc,
  name,
  description,
  discount
}: {
  bannerSrc: string;
  alt: string;
  iconSrc: string;
  name: string;
  description: string;
  discount: string;
}) => {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        borderRadius={theme.shape.borderRadius}
        overflow="hidden"
        sx={{
          cursor: 'pointer'
        }}
        onClick={handleOpen}>
        <Box
          height="180px"
          position="relative"
          sx={{
            '& > img': {
              objectFit: 'contain',
              objectPosition: 'center',
              width: '100%'
            }
          }}>
          <img src={bannerSrc} alt={alt} height="140px" width="100%" />
          <Discount>{discount}</Discount>
        </Box>

        <Box bgcolor="#F1F1F1" position="relative" px={1.5} py={1} height="100px">
          <ListItem component={'button'} sx={{}} disableGutters>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                alt={'alt'}
                src={iconSrc}
                sx={{
                  bgcolor: '#ffffff',
                  '& img': {
                    objectFit: 'contain',
                    objectPosition: 'center',
                    width: '100%',
                    height: '100%'
                  }
                }}
              />
            </ListItemAvatar>
            <ListItemText>
              <Typography variant="subtitle1" fontSize="12px" color="#28404A">
                {name}
              </Typography>
              <Typography variant="body1" fontSize="10px" color="#989898">
                {description}
              </Typography>
            </ListItemText>
          </ListItem>
        </Box>
      </Box>

      <MerchantDialog open={open} onClose={handleClose} />
    </>
  );
};

export default Merchant;
