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

const CATEGORIES = [
  {
    value: 'all',
    label: 'View All'
  },
  {
    value: 'pet-care',
    label: 'Pet care'
  },
  {
    value: 'elder-care',
    label: 'Elder care'
  },
  {
    value: 'child-care',
    label: 'Child care'
  },
  {
    value: 'household',
    label: 'Household'
  }
];

const MERCHANTS = [
  {
    name: 'Papa',
    description:
      'Papa gives older adults companionship and support to live and feel better at home.',
    iconSrc:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1664696754/277775504_4990737387679970_1961644617242490669_n_1_pgcwpo.svg',
    bannerSrc:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1664696474/Home-PapaPals-1_1_z0xdn3.png'
  },
  {
    name: 'Splendid Spoon',
    description:
      'Splendid spoon that help people get and stay healthy with plant-based habits.',
    iconSrc:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1664696756/SplendidSpoon_Guidelines_042121_1_rvqdgo.svg',
    bannerSrc:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1664696474/splendid-spoon1_1_qviguy.png'
  },
  {
    name: 'Care.com',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
    iconSrc:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1664696756/CareLogo_464x128_2_gvboub.svg',
    bannerSrc:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1664696474/Nanny-services_1_jidyxo.png'
  },
  {
    name: 'Nanit',
    description:
      'Nanit lets parents see everything happening in and around the crib in real-time',
    iconSrc:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1664696754/nannit_1_bu6gcr.svg',
    bannerSrc:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1664696474/sunsoakedmama_1_ufctkb.png'
  },
  {
    name: 'Natalist',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    iconSrc:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1664696754/prc33c7ij3yb9owlktze_1_c602p4.svg',
    bannerSrc:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1664696474/Prenatal-Daily-Packet_2_2000x_1_snxxnc.png'
  },
  {
    name: 'HopSkipDrive',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
    iconSrc:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1664696754/hopskipdrive_logo_1_qvbfse.svg',
    bannerSrc:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1664696474/hopskipdrive_1_uizjnf.png'
  },
  {
    name: 'MAVEN',
    description:
      'A virtual care model built around women and families at a lower costs for everyone.',
    iconSrc:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1664696754/Maven_2_so4mhp.svg',
    bannerSrc:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1664696474/Maven_1_owdpnt.png'
  },
  {
    name: 'Vivvi',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
    iconSrc:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1664696754/Vivvi_Regular_1C_Orange_1_iloo7y.svg',
    bannerSrc:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1664696532/vivvi_1_u276yj.png'
  },
  {
    name: 'Sittercity',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
    iconSrc:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1664696756/sittercity_1_yaqbxr.svg',
    bannerSrc:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1664696474/back-to-school-mobile-b739c127ea3f165df4e0f6c63bb17177_1_qsuwej.png'
  }
];

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
            {CATEGORIES.map((category) => (
              <ToggleButton value={category.value} aria-label="all">
                <Typography variant="body2" textTransform="capitalize">
                  {category.label}
                </Typography>
              </ToggleButton>
            ))}
          </StyledToggleButtonGroup>
        </Stack>
      </Box>

      <Grid container rowSpacing={4} columnSpacing={2}>
        {MERCHANTS.map((merchant) => (
          <Grid item xs={3}>
            <Merchant
              bannerSrc={merchant.bannerSrc}
              alt={merchant.name}
              iconSrc={merchant.iconSrc}
              name={merchant.name}
              description={merchant.description}
              discount="10% off"
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Merchants;
