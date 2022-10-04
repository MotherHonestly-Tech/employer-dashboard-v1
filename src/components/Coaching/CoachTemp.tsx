import React from 'react';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';

import CoachBadge from './CoachBadge';
import { Consultant } from '../../models/coaching.model';

const CoachTemp = ({ coach }: { coach: Consultant }) => {

    

  return (
    <CoachBadge content="Business Owner">
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: 1,
          overflow: 'hidden',
          backgroundColor: '#F9F9F7'
        }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            // image="https://res.cloudinary.com/mother-honestly/image/upload/v1657976885/linkedin-sales-solutions-pAtA8xe_iVM-unsplash_kzskcn.png"
            image={coach.headShotUrl}
            alt="green iguana"
          />

          <CardContent sx={{}}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}>
              <Typography variant="subtitle1" component="div">
                {coach.firstName + ' ' + coach.lastName}
              </Typography>
              <Rating
                name="size-large"
                defaultValue={5}
                size="large"
                readOnly
                precision={0.5}
              />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              From $50 per Session
            </Typography>
          </CardContent>

          <Divider light variant="middle" />

          <CardActions
            sx={{
              px: 2
            }}>
            <Typography variant="body2">
              Career, Family, Back to Work
            </Typography>
          </CardActions>
        </CardActionArea>
      </Card>
    </CoachBadge>
  );
};

export default CoachTemp;
