import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import RoundedLogoIcon from '../../theme/icons/RoundedLogo';
import AbsolutePositionedContainer from '../UI/AbsolutePositionedContainer';

import { ReactComponent as ArrowUpMdIcon } from '../../static/svg/arrow-up-md.svg';
import { ReactComponent as ArrowDownMdIcon } from '../../static/svg/arrow-down-md.svg';
import { ReactComponent as DollarIcon } from '../../static/svg/dollar.svg';

type CareStatProps = {
  value: number;
  color: string;
  caption: string;
  type: 'increase' | 'decrease';
  percentStat: string;
  averageStat: string;
};

const CareStat = (props: CareStatProps) => {
  return (
    <Stack alignItems="flex-start">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative">
        <PieChart
          data={[{ value: props.value, key: 1, color: props.color }]}
          reveal={props.value}
          lineWidth={20}
          background="#DFDFDF"
          lengthAngle={360}
          startAngle={0}
          animate
        />

        <AbsolutePositionedContainer>
          <Typography variant="h1" fontSize="2.4rem" align="center">
            {props.value}%
          </Typography>
        </AbsolutePositionedContainer>
      </Box>

      <Typography variant="body1" align="center" my={3}>
        {props.caption}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <RoundedLogoIcon
          sx={{
            borderRadius: 1.5,
            width: 20,
            height: 20,
            bgcolor:
              props.type === 'increase'
                ? 'rgba(0, 189, 64, 0.13)'
                : 'rgba(255, 0, 0, 0.08)'
          }}>
          {props.type === 'increase' ? (
            <ArrowUpMdIcon width=".5rem" />
          ) : (
            <ArrowDownMdIcon width=".5rem" />
          )}
        </RoundedLogoIcon>
        <Typography variant="body1" fontSize=".75rem">
          {props.percentStat}
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1}>
        <RoundedLogoIcon
          sx={{
            borderRadius: 1.5,
            width: 20,
            height: 20,
            bgcolor: '#ffffff',
            border: '1px solid #E0E0E0'
          }}>
          <DollarIcon width=".5rem" />
        </RoundedLogoIcon>
        <Typography variant="body1" fontSize=".75rem">
          {props.averageStat}
        </Typography>
      </Stack>
    </Stack>
  );
};

const STATS: CareStatProps[] = [
  {
    value: 45,
    color: '#00BDA6',
    caption: 'of your workforce have children ages 0-5',
    type: 'increase',
    percentStat: '6% since last year',
    averageStat: 'Avg of $25,500 per child on childcare'
  },
  {
    value: 15,
    color: '#C27171',
    caption: 'of your workforce have aging parents',
    type: 'increase',
    percentStat: '10% since last year',
    averageStat: 'Avg of $90,000 per nursing home fees '
  },
  {
    value: 7,
    color: '#B4B2D7',
    caption: 'of your workforce have a sick or disabled partner',
    type: 'decrease',
    percentStat: '5% decrease since last year',
    averageStat: 'Avg of $10,000 spent on care expenses'
  },
  {
    value: 73,
    color: '#9CAC94',
    caption: 'of your workforce are employee caregivers',
    type: 'increase',
    percentStat: '10% more than last year',
    averageStat: 'Avg of $50,000 on care expenses'
  }
];

const CareStats = () => {
  return (
    <Box border={1} borderColor="#B7B7B7" borderRadius={2} p={3} mt={6}>
      <Typography
        variant="body1"
        fontFamily="Area-Normal-Black"
        fontSize="1rem"
        sx={{
          mb: 3
        }}>
        Care At A Glance
      </Typography>

      <Stack direction="row" spacing={2}>
        <Grid container spacing={5}>
          {STATS.map((stat) => (
            <Grid item xs={3}>
              <CareStat {...stat} />
            </Grid>
          ))}
        </Grid>

        <Divider orientation="vertical" variant="middle" flexItem light />

        <Paper
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
          <Typography variant="h1" fontSize="2.4rem" align="center">
            $38,500
          </Typography>
          <Typography variant="body1" align="center" color="#8D8D8D" my={3}>
            Avg. care related expenses per employee per year
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};

export default CareStats;
