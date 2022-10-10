import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import WalletBalance from '../../components/Dashboard/WalletBalance';
// import Consultant from '../../components/Dashboard/Consultant';
import Concierge from '../../components/Dashboard/Concierge';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import AuthContext from '../../store/context/auth-context';
import Footer from '../../components/Layout/Footer';
import DashToolkit from '../../components/Dashboard/DashToolkit';
import DashVideo from '../../components/Dashboard/DashVideo';
import DashEvent from '../../components/Dashboard/DashEvent';
import DashArticle from '../../components/Dashboard/DashArticle';
import DashPodcast from '../../components/Dashboard/DashPodcast';
import CoachTemp from '../../components/Coaching/CoachTemp';
import { Consultant } from '../../models/coaching.model';
import { ReactComponent as ConsultantIcon } from '../../static/svg/brand/consultant.svg';

const COACHES: Consultant[] = [
  {
    firstName: 'Hugh',
    lastName: 'Marks',
    headShotUrl:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1665065516/linkedin-sales-solutions-pAtA8xe_iVM-unsplash_1_dzuva0.png',
    interests: 'Return-to-work'
  },
  {
    firstName: 'Christine',
    lastName: 'Kirra',
    headShotUrl:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1665065090/istockphoto-1336471714-1024x1024-transformed_1_bavm7o.png',
    interests: 'Financial wellness'
  },
  {
    firstName: 'Jessica',
    lastName: 'Lynn',
    headShotUrl:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1665065090/istockphoto-1316878046-1024x1024-transformed_1_ee3ihq.png',
    interests: 'Leadership'
  }
] as Consultant[];

const CARE_COACHES: Consultant[] = [
  {
    firstName: 'Alexis',
    lastName: 'Barad-Cutler',
    headShotUrl:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1665066719/Alexis_Barad-Cutler_1_yqmooc.png',
    interests: 'Mentorship, Eldercare, Productivity'
  },
  {
    firstName: 'Tiffany',
    lastName: 'Porter',
    headShotUrl:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1665066719/Tiffany_Porter_New_1_kyalzb.png',
    interests: 'Career, Financial Wellness'
  },
  {
    firstName: 'Nikki',
    lastName: 'Adamson',
    headShotUrl:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1665066719/Nikki_Adamson_1_blm5el.png',
    interests: 'Career, Family, Back to Work'
  }
] as Consultant[];

const Dashboard = () => {
  const authCtx = React.useContext(AuthContext);

  const coach: Consultant = {
    firstName: 'Jane',
    lastName: 'Doe',
    headShotUrl:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1657976885/linkedin-sales-solutions-pAtA8xe_iVM-unsplash_kzskcn.png'
  } as Consultant;

  return (
    <React.Fragment>
      <Box mb={4}>
        <Typography variant="h2" my={1} gutterBottom>
          Welcome {authCtx.user?.firstName}!
        </Typography>

        <Typography variant="body1" gutterBottom>
          Your family at a glance : Partner, 2 Kids, 1 Pet
        </Typography>
      </Box>

      <Grid container columnSpacing={2} direction="row" alignItems="stretch">
        <Grid item xs={4} lg={5}>
          <WalletBalance />
        </Grid>
        <Grid item xs={8} lg={7}>
          <RecentTransactions />
        </Grid>
      </Grid>

      <Box mt={5}>
        <Typography variant="h3" gutterBottom align="center" mb={4}>
          1:1 Work-Life Connect At Unilever
        </Typography>

        <Grid container spacing={7}>
          {COACHES.map((coach) => (
            <Grid item xs={4}>
              <CoachTemp coach={coach} onMouseClick={() => {}} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={5}>
        <Box py={7} minHeight="100px">
          <Typography variant="h1" align="center" paragraph>
            1:1 Coaching For Career, Caregiving & More
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            mt={2}>
            <ConsultantIcon width="1.3rem" />
            <Typography
              variant="subtitle2"
              color="#194049"
              fontSize=".7rem"
              textTransform="uppercase">
              Consultants
            </Typography>
          </Stack>
        </Box>

        <Grid container spacing={7}>
          {CARE_COACHES.map((coach) => (
            <Grid item xs={4}>
              <CoachTemp coach={coach} onMouseClick={() => {}} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={5}>
        <Concierge />
      </Box>

      <DashToolkit />
      <DashVideo />
      <DashEvent />
      <DashArticle />
      <DashPodcast />
      <Footer />
    </React.Fragment>
  );
};

export default Dashboard;
