import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import SearchFilter from '../../components/Coaching/SearchFilter';
import CoachTemp from '../../components/Coaching/CoachTemp';
import { Consultant } from '../../models/coaching.model';

const Connect = () => {
  const coaches: Consultant[] = [
    {
      firstName: 'Mark',
      lastName: 'Henry',
      headShotUrl:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1665065516/linkedin-sales-solutions-pAtA8xe_iVM-unsplash_1_dzuva0.png'
    },
    {
      firstName: 'Christine',
      lastName: 'Kirra',
      headShotUrl:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1657976885/linkedin-sales-solutions-pAtA8xe_iVM-unsplash_kzskcn.png'
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      headShotUrl:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1657976885/linkedin-sales-solutions-pAtA8xe_iVM-unsplash_kzskcn.png'
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      headShotUrl:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1657976885/linkedin-sales-solutions-pAtA8xe_iVM-unsplash_kzskcn.png'
    }
  ] as Consultant[];

  return (
    <React.Fragment>
      <Grid container minHeight="200px" mt={3}>
        <Grid item xs={6}>
          <img
            src="https://res.cloudinary.com/mother-honestly/image/upload/v1665427340/christina-wocintechchat-com-50TkCaP8M3A-unsplash_e3nukm.jpg"
            alt="background"
          />
        </Grid>
        <Grid item xs={6} bgcolor="#F3F4F6" px={2} py={6}>
          <Typography variant="h2" align="center" paragraph>
            Message from CEO
          </Typography>
          <Typography variant="body2" paragraph>
           
          </Typography>

          <Typography variant="body2" textTransform="uppercase" align="center">
            Jane Carrie
          </Typography>
        </Grid>
      </Grid>

      <Box py={7} minHeight="100px">
        <Typography variant="h1" align="center" paragraph>
          1:1 Work-Life Connect At Unilever
        </Typography>
      </Box>

      <SearchFilter />

      <Grid container rowSpacing={4} columnSpacing={2} mt={2}>
        {coaches.map((coach) => (
          <Grid item xs={4} key={coach.firstName}>
            <CoachTemp coach={coach} onMouseClick={() => {}} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default Connect;
