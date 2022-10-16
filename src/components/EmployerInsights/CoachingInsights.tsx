import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import BorderLinearProgress from '../UI/LinearProgress';

type CoachingHoursProps = {
  category: string;
  value: number;
  hours: number;
  color: string;
};

const RoundedStat = styled('section')<{ bgcolor: string }>(
  ({ theme, bgcolor }) => ({
    borderRadius: '50%',
    border: '2px solid #FFFFFF',
    backgroundColor: bgcolor,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  })
);

const CoachingHours = (props: CoachingHoursProps) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" mb={1.4}>
      <Box width={120} overflow="hidden">
        <Typography
          variant="subtitle1"
          fontSize=".8rem"
          textOverflow="ellipsis">
          {props.category}
        </Typography>
      </Box>
      <BorderLinearProgress
        variant="determinate"
        value={props.value}
        barcolor={props.color}
      />
      <Box width={30}>
        <Typography variant="subtitle2" fontSize=".75rem" color="#B7B7B7">
          {props.hours}hrs
        </Typography>
      </Box>
    </Stack>
  );
};

const CoachingInsights = () => {
  const COACHING_HOURS: CoachingHoursProps[] = [
    {
      category: 'Wellbeing',
      value: 45,
      hours: 22,
      color: '#B4B2D7'
    },
    {
      category: 'Finances',
      value: 39,
      hours: 15,
      color: '#D2E0CB'
    },
    {
      category: 'Household',
      value: 25,
      hours: 8,
      color: '#FFDA9C'
    },
    {
      category: 'Career',
      value: 68,
      hours: 30,
      color: '#C27171'
    },
    {
      category: 'Family',
      value: 80,
      hours: 40,
      color: ' #C7D8E4'
    }
  ];

  return (
    <Box my={5}>
      <RoundedStat
        bgcolor="#F2EC2C"
        sx={{
          width: 200,
          height: 200,
          mx: 'auto'
        }}>
        <Typography variant="h3" gutterBottom>
          105hrs
        </Typography>
        <Typography variant="body2" fontSize=".7rem">
          1:1 Coaching
        </Typography>
      </RoundedStat>

      <RoundedStat
        bgcolor="#28404A"
        sx={{
          width: 160,
          height: 160,
          mx: 'auto',
          transform: 'translate(-60px, -45px)',
          '& > *': {
            color: '#fff'
          }
        }}>
        <Typography variant="h3" gutterBottom>
          50hrs
        </Typography>
        <Typography variant="body2" fontSize=".7rem">
          1:1 Connect
        </Typography>
      </RoundedStat>

      <Paper
        sx={{
          p: 2,
          borderRadius: 2
        }}>
        <Typography variant="body1" fontFamily="Area-Normal-Black" paragraph>
          1:1 Coaching
        </Typography>

        {COACHING_HOURS.map((hours) => (
          <CoachingHours key={hours.category} {...hours} />
        ))}
      </Paper>
    </Box>
  );
};

export default CoachingInsights;
