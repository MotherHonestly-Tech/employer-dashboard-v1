import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import RoundedLogoIcon from '../../theme/icons/RoundedLogo';
import CoachingInsights from '../../components/EmployerInsights/CoachingInsights';
import EmployeeExpenditure from '../../components/EmployerInsights/EmployeeExpenditure';
import CareStats from '../../components/EmployerInsights/CareStats';

import AuthContext from '../../store/context/auth-context';
import { ReactComponent as UsersGroupIcon } from '../../static/svg/users-group.svg';
import { ReactComponent as UsersIcon } from '../../static/svg/users.svg';
import { ReactComponent as UsersCancelledIcon } from '../../static/svg/users-cancelled.svg';
import { ReactComponent as BinIcon } from '../../static/svg/bin.svg';


type EmployeeStatProps = {
  theme: 'dark' | 'light';
  icon: React.ReactElement;
  title: string;
  stat: number;
};

const EmployeeStat = ({ theme, icon, title, stat }: EmployeeStatProps) => {
  return (
    <Box
      p={3}
      bgcolor={theme === 'dark' ? 'primary.main' : 'common.white'}
      borderRadius={2}
      boxShadow="0px 5px 26px rgba(197, 216, 222, 0.25)"
      minHeight={180}>
      {icon}
      <Typography
        variant="body2"
        color={theme === 'dark' ? 'common.white' : 'primary.main'}
        gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="h1"
        color={theme === 'dark' ? 'common.white' : 'primary.main'}>
        {stat}
      </Typography>
    </Box>
  );
};

const EmployeeStatsGrid = () => {
  const STATS: EmployeeStatProps[] = [
    {
      theme: 'dark',
      icon: (
        <RoundedLogoIcon sx={{ p: 0.6, mb: 2 }}>
          <UsersGroupIcon />
        </RoundedLogoIcon>
      ),
      title: 'No of Employees',
      stat: 116
    },
    {
      theme: 'light',
      icon: (
        <Box height={40} width={40} mb={2}>
          <UsersIcon />
        </Box>
      ),
      title: 'Successfully Onboarded Employees',
      stat: 112
    },
    {
      theme: 'light',
      icon: (
        <Box height={40} width={40} mb={2}>
          <UsersCancelledIcon />
        </Box>
      ),
      title: 'Pending Employees',
      stat: 114
    }
  ];

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {STATS.map((stat) => (
          <Grid item xs={4} key={stat.title}>
            <EmployeeStat {...stat} />
          </Grid>
        ))}
      </Grid>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={1}
        mt={1}>
        <BinIcon width=".9rem" />
        <RoundedLogoIcon
          sx={{
            height: '20px',
            width: '20px',
            bgcolor: '#F2EC2C',
            p: 1
          }}>
          <Typography
            component="span"
            variant="body2"
            fontSize=".7rem"
            fontFamily="Area-Normal-Bold">
            4
          </Typography>
        </RoundedLogoIcon>
      </Stack>
    </React.Fragment>
  );
};

const Dashboard = () => {
  const authCtx = React.useContext(AuthContext);

  return (
    <React.Fragment>
      <Box mb={4}>
        <Typography
          variant="subtitle1"
          fontFamily="Area-Normal-Black"
          fontSize="1.25rem"
          my={1}
          gutterBottom>
          Welcome {authCtx.user?.firstName}!
        </Typography>

        <Divider light />

        <Box>
          <Typography variant="h1" align="center" my={2} gutterBottom>
            Employee Insights
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={8.5}>
              <EmployeeStatsGrid />

              <EmployeeExpenditure />
            </Grid>
            <Grid item xs={3.5}>
              <Box bgcolor="#F6F6F6" p={2} borderRadius={2}>
                <Typography variant="body1" fontFamily="Area-Normal-Black">
                  Work-Life Activity
                </Typography>

                <CoachingInsights />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <CareStats />
      </Box>
    </React.Fragment>
  );
};

export default Dashboard;
