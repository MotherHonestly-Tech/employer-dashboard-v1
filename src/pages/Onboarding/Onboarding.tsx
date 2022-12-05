import React from 'react';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import MHButton from '../../components/Button/MHButton';
import MHRadioGroup from '../../components/Form/MHRadioGroup';
import ConnectProvider from '../../components/Merge/ConnectProvider';

import MHLogo from '../../theme/icons/MHLogo';
import { BACKGROUND_IMAGE_SX } from '../../utils/constants';

const RADIO_OPTIONS: Array<{ value: string; label: string }> = [
  {
    value: 'yes',
    label: 'Yes'
  },
  {
    value: 'no',
    label: 'No'
  }
];

const Onboarding = () => {
  const [hasHrProvider, setHasHrProvider] = React.useState<string>('');

  const [mergeOpen, setMergeOpen] = React.useState(false);

  const history = useHistory();

  const providerChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasHrProvider(e.target.value);
  };

  const submitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);

    if (hasHrProvider === 'yes') {
      setMergeOpen(true);
    } else {
      setMergeOpen(false);
      history.replace('organization/upload-employees');
    }
  };

  const mergeClosedHandler = React.useCallback(() => {
    setMergeOpen(false);
  }, []);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      sx={{
        backgroundImage:
          'url(https://res.cloudinary.com/mother-honestly/image/upload/v1668704562/pattern-bg_vctorp.svg)',
        ...BACKGROUND_IMAGE_SX
      }}>
      <Box position="relative" top={-25}>
        <MHLogo style={{ width: '3.4rem' }} />
      </Box>

      <Container
        maxWidth="sm"
        sx={{
          p: 5,
          borderRadius: (theme) => theme.shape.borderRadius,
          backgroundColor: 'common.white',
          boxShadow: '0px 10px 16px rgba(154, 154, 154, 0.13)'
        }}>
        <Typography variant="h1" align="center" mb={3}>
          Let's take a few seconds to set you up
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Does your organization have an HR / Payroll provider?
        </Typography>

        <Box component="form" onSubmit={submitHandler}>
          <MHRadioGroup
            id="hr-payroll"
            name="hr-payroll"
            value={hasHrProvider}
            onChange={providerChangeHandler}
            options={RADIO_OPTIONS}
            controlSx={{
              py: 2,
              px: 3,
              border: 1,
              borderColor: '#dadad8',
              borderRadius: (theme) => theme.shape.borderRadius,
              boxSizing: 'border-box',
              margin: '10px 0 10px',
              '& > span': {
                fontFamily: 'Area-Normal-Bold'
              }
            }}
          />

          <MHButton
            sx={{}}
            type="submit"
            disabled={!hasHrProvider}
            loading={false}
            fullWidth>
            Next
          </MHButton>
        </Box>
      </Container>

      {mergeOpen && <ConnectProvider onMergeExit={mergeClosedHandler} />}
      {/* onMergeClose={mergeClosedHandler}  */}
    </Stack>
  );
};

export default Onboarding;
