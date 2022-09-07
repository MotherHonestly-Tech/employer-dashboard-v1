import React from 'react';
import { useHistory } from 'react-router-dom';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import MHInterestCheckbox from '../../components/Form/MHInterestCheckbox';
import MHButton from '../../components/Button/MHButton';

import MHLogoIcon from '../../theme/icons/MHLogo';
import { theme } from '../../theme/mui/dashboard.theme';
import useHttp from '../../hooks/use-http';
import BackdropLoader from '../../components/UI/BackdropLoader';
import AuthContext from '../../store/context/auth-context';
import { Interest } from '../../models/onboarding';
import { HttpResponse } from '../../models/api.interface';

type CheckedInterest = {
  uuid: number;
  interest: string;
  colorCode: string;
};

const Interests = () => {
  const history = useHistory();
  const authCtx = React.useContext(AuthContext);

  const [interests, setInterests] = React.useState<Interest[]>([]);

  const { token, userId } = authCtx;
  const {
    loading: loadingInterests,
    sendHttpRequest: fetchInterests
  } = useHttp();
  const {
    loading: savingInterests,
    sendHttpRequest: personalizeDashboard
  } = useHttp();

  let setOfCheckedInterests: Array<{
    interest: string;
    hexColorCode: string;
  }> = [];

  React.useEffect(() => {
    fetchInterests(
      process.env.REACT_APP_API_BASE_URL + 'employee/dashboard/interests/base',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token?.accessToken}`
        }
      },
      (response: HttpResponse<Interest[]>) => {
        setInterests(response.data as Interest[]);
      }
    );
  }, []);

  if (loadingInterests || savingInterests) {
    return <BackdropLoader />;
  }

  const checkedHandler = (
    interest: string,
    hexColorCode: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setOfCheckedInterests = setOfCheckedInterests.concat({
        interest,
        hexColorCode
      });
    } else {
      setOfCheckedInterests = setOfCheckedInterests.filter(
        (item) => item.interest !== interest
      );
    }
  };

  const submitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    if (setOfCheckedInterests.length === 0) return;

    const reqPayload: CheckedInterest[] = setOfCheckedInterests.map((item) => ({
      interest: item.interest,
      colorCode: item.hexColorCode,
      uuid: userId as number
    }));

    personalizeDashboard(
      process.env.REACT_APP_API_BASE_URL + 'employee/dashboard/interests',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token?.accessToken}`
        },
        body: JSON.stringify(reqPayload)
      },
      (response: HttpResponse<any>) => {
        history.push('/organization/dashboard');
      }
    );
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: theme.palette.common.white,
        position: 'relative'
      }}>
      <Grid container spacing={0} sx={{ minHeight: '100vh' }}>
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: theme.palette.common.white,
            position: 'relative',
            py: 5
          }}>
          <Box component={'div'} mx="auto">
            <MHLogoIcon />
          </Box>
          <Stack
            component="form"
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2 }}
            onSubmit={submitHandler}>
            <div>
              <Typography variant="h1" my={1} align="center" gutterBottom>
                Please Choose Work-Life Care Areas That Apply To You
              </Typography>
              <Typography variant="subtitle2" align="center" gutterBottom>
                Your Dashboard will be populated by your interest
              </Typography>
            </div>

            <Stack
              direction="row"
              justifyContent={'center'}
              alignItems="center"
              mt={6}
              flexWrap="wrap">
              {interests.map((interest) => (
                <MHInterestCheckbox
                  key={interest.id}
                  fill={interest.colorCode}
                  label={interest.interest}
                  value={false}
                  onChange={checkedHandler.bind(
                    null,
                    interest.interest,
                    interest.colorCode
                  )}
                />
              ))}
            </Stack>

            <Stack direction={'row'} justifyContent="center" spacing={8} mt={6}>
              <MHButton
                sx={{
                  textAlign: 'center',
                  px: 12
                }}
                variant="outlined"
                onClick={() => history.push('/organization/dashboard')}>
                Skip
              </MHButton>

              <MHButton
                type="submit"
                sx={{
                  textAlign: 'center',
                  px: 12
                }}>
                {'Finish'}
              </MHButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Interests;
