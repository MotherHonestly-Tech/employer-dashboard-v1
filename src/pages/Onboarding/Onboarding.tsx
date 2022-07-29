import React from 'react';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Steps from '../../components/Steps/Steps';
import InitialStep from '../../components/Onboarding/InitialStep';
import IntermediateStep from '../../components/Onboarding/IntermediateStep';
import FinalStep from '../../components/Onboarding/FinalStep';
import BackdropLoader from '../../components/UI/BackdropLoader';
import useHttp from '../../hooks/use-http';

import MHLogoIcon from '../../theme/icons/MHLogo';
import { theme } from '../../theme/mui/dashboard.theme';
import OnboardingContext from '../../store/context/onboarding-context';
import AuthContext from '../../store/context/auth-context';
import { HttpResponse } from '../../models/api.interface';
import { constructDateFormat } from '../../utils/utils';

const steps = [1, 2, 3];

const Onboarding = () => {
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);
  const onboardingCtx = React.useContext(OnboardingContext);
  const authCtx = React.useContext(AuthContext);

  const history = useHistory();

  const { loading, error, sendHttpRequest: onboardEmployee } = useHttp();

  let ActiveFormComponent: React.ElementType | null = null;

  switch (activeStepIndex) {
    case 0:
      ActiveFormComponent = InitialStep;
      break;
    case 1:
      ActiveFormComponent = IntermediateStep;
      break;
    case 2:
      ActiveFormComponent = FinalStep;
      break;
    case 3:
      ActiveFormComponent = FinalStep;
      break;
    default:
      ActiveFormComponent = InitialStep;
      break;
  }

  const nextStepHandler = () => {
    setActiveStepIndex((prevIndex) =>
      prevIndex < steps.length - 1 ? prevIndex + 1 : prevIndex
    );

    if (activeStepIndex === steps.length - 1) {
      setCompleted(true);
    }
  };

  const previousStepHandler = (event: React.MouseEvent) => {
    setActiveStepIndex((prevIndex) => prevIndex - 1);
  };

  const { userId, token, user } = authCtx;
  const { employee } = onboardingCtx;

  const empData = React.useMemo(() => employee, [employee]);

  const completeOnboarding = React.useCallback(() => {
    const reqPayload = {
      uuid: userId,
      employeeEmail: user?.email,
      firstName: empData?.firstName,
      lastName: empData?.lastName,
      zipCode: empData?.zipCode,
      relationShipStatus: empData?.relationshipStatus,
      numberOfKids: empData?.numberOfKids,
      livingParent: empData?.livingParents === 'yes',
      identity: empData?.identity,
      dateOfBirth: constructDateFormat(empData?.dateOfBirth as Date),
      petStatus: empData?.petBoolQ === 'yes',
      numberOfPets: empData?.numberOfPets,
      jobTitle: empData?.jobTitle,
      position: empData?.position,
      workDepartment: empData?.department,
      careResponsibility: (empData?.careResponsibilities as Array<string>).join(
        ','
      )
    };

    onboardEmployee(
      process.env.REACT_APP_API_BASE_URL + 'employee/dashboard/employee',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token?.accessToken}`
        },
        body: JSON.stringify(reqPayload)
      },
      (response: HttpResponse<any>) => {
        history.push('/onboarding/interests');
      }
    );
  }, [empData, onboardEmployee, userId, token, user, history]);

  React.useEffect(() => {
    if (completed) {
      completeOnboarding();
    }
  }, [completed, completeOnboarding]);

  if (error) {
    setCompleted(false);
  }

  return (
    <React.Fragment>
      {loading && <BackdropLoader />}
      <Grid container spacing={0} sx={{ minHeight: '100vh' }}>
        <Grid
          item
          xs={6}
          sx={{
            backgroundColor: theme.palette.background.paper,
            position: 'relative'
          }}
          py={6}>
          <Stack
            direction="column"
            minHeight="100vh"
            mx="auto"
            px={12}
            width="100%"
            maxWidth="sm">
            <Box mb={6}>
              <MHLogoIcon />
            </Box>

            <Typography
              variant="h1"
              component="div"
              align="center"
              gutterBottom>
              Tell us a little about yourself
            </Typography>

            <Box
              sx={{
                mt: 3
              }}>
              <Steps steps={steps} activeStep={activeStepIndex} />

              {ActiveFormComponent && (
                <ActiveFormComponent
                  activeIndex={activeStepIndex}
                  onNext={nextStepHandler}
                  onPrevious={previousStepHandler}
                />
              )}
            </Box>
          </Stack>
        </Grid>

        <Grid
          item
          xs={6}
          position="sticky"
          height="100vh"
          sx={{
            top: 0
          }}>
          <Box
            component="div"
            position="relative"
            sx={{
              height: '100vh',
              overflow: 'hidden'
            }}>
            <img
              src="https://res.cloudinary.com/mother-honestly/image/upload/v1657836331/alex-lvrs-4N5huJDOydQ-unsplash_1_1_qubnfw.png"
              alt="alex-lvrs"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Onboarding;
