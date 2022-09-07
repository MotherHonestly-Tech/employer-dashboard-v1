import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import WalletBalance from "../../components/Dashboard/WalletBalance";
import Consultant from "../../components/Dashboard/Consultant";
import Concierge from "../../components/Dashboard/Concierge";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import AuthContext from "../../store/context/auth-context";

const Dashboard = () => {
  const authCtx = React.useContext(AuthContext);

  return (
    <React.Fragment>
      <Box mb={4}>
        <Typography variant="h2" my={1} gutterBottom>
          Welcome {authCtx.user?.firstName}!
        </Typography>

        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
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
          <Grid item xs={4}>
            <Consultant imageSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1657976885/linkedin-sales-solutions-pAtA8xe_iVM-unsplash_kzskcn.png" />
          </Grid>
          <Grid item xs={4}>
            <Consultant imageSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1657976885/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash_dxhylh.png" />
          </Grid>
          <Grid item xs={4}>
            <Consultant imageSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1657976886/jurica-koletic-7YVZYZeITc8-unsplash_1_bxrqph.png" />
          </Grid>
        </Grid>
      </Box>
      
      <Box mt={5}>
        <Concierge />
      </Box>
    </React.Fragment>
  );
};

export default Dashboard;
