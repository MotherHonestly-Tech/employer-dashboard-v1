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
        'https://res.cloudinary.com/mother-honestly/image/upload/v1665065516/linkedin-sales-solutions-pAtA8xe_iVM-unsplash_1_dzuva0.png',
      interests: 'Leadership'
    },
    {
      firstName: 'Christine',
      lastName: 'Kirra',
      headShotUrl:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1665065090/istockphoto-1336471714-1024x1024-transformed_1_bavm7o.png',
      interests: 'Mentoring'
    },
    {
      firstName: 'Melissa',
      lastName: 'Jones',
      headShotUrl:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1665065090/istockphoto-1316878046-1024x1024-transformed_1_ee3ihq.png',
      interests: 'Return-to-work'
    },
    {
      firstName: 'Margaret',
      lastName: 'Intoina',
      headShotUrl:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1665427800/christina-wocintechchat-com-kXfBDl0fR1E-unsplash_1_uvv2rx.png',
      interests: 'Financial wellness'
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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
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
