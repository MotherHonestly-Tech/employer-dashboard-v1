import React, { useCallback } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import MHDialog from '../Dialog/MHDialog';
import MHButton from '../Button/MHButton';
import BackdropLoader from '../UI/BackdropLoader';
import useHttp from '../../hooks/use-http';

import MergeLinkContext from '../../services/merge-link';
import { ReactComponent as CheckMarkRoundedLargeIcon } from '../../static/svg/check-mark-rounded-lg.svg';
import { HttpResponse } from '../../models/api.interface';
import MergeLink from './MergeLink';
import AuthContext from '../../store/context/auth-context';

const ConnectProvider = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [isProviderConnected, setIsProviderConnected] = React.useState(false);

  const mergeCtx = React.useContext(MergeLinkContext);
  const { linkToken, generateLinkToken } = mergeCtx;

  const authCtx = React.useContext(AuthContext);
  const { user } = authCtx;

  const { loading, error, sendHttpRequest: exchangePublicToken } = useHttp();

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  React.useEffect(() => {
    handleOpen();
    generateLinkToken();
  }, []);

  const onSuccess = useCallback(
    (public_token: string) => {
      // Send public_token to server (Step 3)
      console.log(public_token);
      exchangePublicToken(
        process.env.REACT_APP_API_BASE_URL +
          'employee/dashboard/merge/account/token',
        {
          method: 'POST',
          body: JSON.stringify({
            publicToken: public_token,
            employerRefId: user!.employerRefId
          })
        },
        (response: HttpResponse<unknown>) => {
          console.log(response);
          setIsProviderConnected(true);
        }
      );
    },
    [exchangePublicToken]
  );

  const mergeExitHandler = () => {};

  return (
    <React.Fragment>
      {loading && <BackdropLoader />}

      <MHDialog
        open={openModal}
        title={' '}
        handleClose={handleClose}
        scroll="paper"
        actions={
          isProviderConnected ? (
            <MHButton fullWidth>Continue to Dashboard</MHButton>
          ) : null
        }
        maxWidth={'xs'}
        fullWidth>
        {!isProviderConnected ? (
          <Box
            sx={{
              px: 2
            }}>
            <Typography
              variant="h2"
              align="center"
              color="primary.main"
              gutterBottom
              paragraph>
              Connect HR/Payroll Provider
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="primary.main"
              paragraph
              gutterBottom>
              We will need to connect your provider
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="primary.main"
              paragraph
              gutterBottom>
              You will be redirected to merge to connect your provider shortly.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              px: 2,
              '& svg': {
                display: 'block',
                marginX: 'auto',
                marginY: '30px'
              }
            }}>
            <CheckMarkRoundedLargeIcon />
            <Typography
              variant="body1"
              align="center"
              color="primary.main"
              gutterBottom
              paragraph>
              You have successfully connected your HR/Payroll provider
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="primary.main"
              paragraph
              gutterBottom>
              We will begin to import employee data. This should be completed
              within 24 hrs.
            </Typography>
          </Box>
        )}
      </MHDialog>

      <MergeLink
        linkToken={linkToken as string}
        onSuccess={onSuccess}
        onMergeExit={mergeExitHandler}
      />
    </React.Fragment>
  );
};

export default ConnectProvider;
