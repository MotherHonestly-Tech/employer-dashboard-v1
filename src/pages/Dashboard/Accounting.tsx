import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';

import AbsolutePositionedContainer from '../../components/UI/AbsolutePositionedContainer';
import Transactions from '../../components/Accounting/Transactions';
import Invoice from '../../components/Accounting/Invoice';
import Statement from '../../components/Accounting/Statement';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontSize: theme.typography.pxToRem(12),
  marginRight: theme.spacing(1),
  '&.Mui-selected': {
    fontFamily: 'Area-Normal-Bold'
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)'
  }
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Accounting = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box
        bgcolor="secondary.main"
        height={185}
        pl={5}
        pt={8}
        position="relative">
        <Typography variant="h1">Accounting</Typography>

        <AbsolutePositionedContainer bottom={0} sx={{}} defaultPos>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="accounting tabs">
            <StyledTab label="Transactions" {...a11yProps(0)} />
            <StyledTab label="Invoice" {...a11yProps(1)} />
            <StyledTab label="Statement" {...a11yProps(2)} />
          </Tabs>
        </AbsolutePositionedContainer>
      </Box>

      <TabPanel value={value} index={0}>
        <Transactions />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Invoice />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Statement />
      </TabPanel>
    </div>
  );
};

export default Accounting;
