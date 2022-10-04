import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import { styled, useTheme } from '@mui/material/styles';

import Merchant from '../../components/Merchants/MerchantItem';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: `0 ${theme.spacing(3)}`,
    border: `1px solid ${theme.palette.primary.main}`,
    '&.Mui-disabled': {
      border: 0
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.primary.main}`
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius
    }
  }
}));

const Merchants = () => {
  const [category, setCategory] = React.useState<string>('all');

  const handleCategoryChange = (
    event: React.MouseEvent<HTMLElement>,
    newCategory: string
  ) => {
    setCategory(newCategory);
  };

  return (
    <div>
      <Box mx="auto" py={2}>
        <Typography variant="h3" align="center" fontSize="1.75rem" gutterBottom>
          Merchants
        </Typography>
        <Typography variant="body1" align="center" color="#9C9C9C" paragraph>
          Curated products, deals, and services to help manage your care
          responsibilities
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" my={5}>
          <StyledToggleButtonGroup
            value={category}
            exclusive
            onChange={handleCategoryChange}
            sx={{
              display: 'flex',
              mx: 'auto'
            }}
            aria-label="care categories">
            <ToggleButton value="all" aria-label="all">
              <Typography variant="body2" textTransform="capitalize">
                View All
              </Typography>
            </ToggleButton>
            <ToggleButton value="pet-care" aria-label="pet care">
              <Typography variant="body2" textTransform="capitalize">
                Pet care
              </Typography>
            </ToggleButton>
            <ToggleButton value="elder-care" aria-label="elder care">
              <Typography variant="body2" textTransform="capitalize">
                Elder care
              </Typography>
            </ToggleButton>
            <ToggleButton value="child-care" aria-label="child care">
              <Typography variant="body2" textTransform="capitalize">
                Child care
              </Typography>
            </ToggleButton>
            <ToggleButton value="household" aria-label="household">
              <Typography variant="body2" textTransform="capitalize">
                Household
              </Typography>
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Stack>
      </Box>

      <Grid container rowSpacing={4} columnSpacing={2}>
        <Grid item xs={3}>
          <Merchant
            bannerSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1664696474/hopskipdrive_1_uizjnf.png"
            alt="Papa"
            iconSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1664696754/277775504_4990737387679970_1961644617242490669_n_1_pgcwpo.svg"
            name="Papa"
            description="Papa gives older adults companionship and support to live and feel better at home."
            discount="10% off"
          />
        </Grid>
        <Grid item xs={3}>
          <Merchant
            bannerSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1664696474/hopskipdrive_1_uizjnf.png"
            alt="Papa"
            iconSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1664696754/277775504_4990737387679970_1961644617242490669_n_1_pgcwpo.svg"
            name="Papa"
            description="Papa gives older adults companionship and support to live and feel better at home."
            discount="10% off"
          />
        </Grid>
        <Grid item xs={3}>
          <Merchant
            bannerSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1664696474/hopskipdrive_1_uizjnf.png"
            alt="Papa"
            iconSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1664696754/277775504_4990737387679970_1961644617242490669_n_1_pgcwpo.svg"
            name="Papa"
            description="Papa gives older adults companionship and support to live and feel better at home."
            discount="10% off"
          />
        </Grid>
        <Grid item xs={3}>
          <Merchant
            bannerSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1664696474/hopskipdrive_1_uizjnf.png"
            alt="Papa"
            iconSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1664696754/277775504_4990737387679970_1961644617242490669_n_1_pgcwpo.svg"
            name="Papa"
            description="Papa gives older adults companionship and support to live and feel better at home."
            discount="10% off"
          />
        </Grid>
        <Grid item xs={3}>
          <Merchant
            bannerSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1664696474/hopskipdrive_1_uizjnf.png"
            alt="Papa"
            iconSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1664696754/277775504_4990737387679970_1961644617242490669_n_1_pgcwpo.svg"
            name="Papa"
            description="Papa gives older adults companionship and support to live and feel better at home."
            discount="10% off"
          />
        </Grid>
        <Grid item xs={3}>
          <Merchant
            bannerSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1664696474/hopskipdrive_1_uizjnf.png"
            alt="Papa"
            iconSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1664696754/277775504_4990737387679970_1961644617242490669_n_1_pgcwpo.svg"
            name="Papa"
            description="Papa gives older adults companionship and support to live and feel better at home."
            discount="10% off"
          />
        </Grid>
        <Grid item xs={3}>
          <Merchant
            bannerSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1664696474/hopskipdrive_1_uizjnf.png"
            alt="Papa"
            iconSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1664696754/277775504_4990737387679970_1961644617242490669_n_1_pgcwpo.svg"
            name="Papa"
            description="Papa gives older adults companionship and support to live and feel better at home."
            discount="10% off"
          />
        </Grid>
        <Grid item xs={3}>
          <Merchant
            bannerSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1664696474/hopskipdrive_1_uizjnf.png"
            alt="Papa"
            iconSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1664696754/277775504_4990737387679970_1961644617242490669_n_1_pgcwpo.svg"
            name="Papa"
            description="Papa gives older adults companionship and support to live and feel better at home."
            discount="10% off"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Merchants;
