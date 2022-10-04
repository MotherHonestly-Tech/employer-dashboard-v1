import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  PlaidLinkOnSuccessMetadata,
  PlaidLinkOptions,
  usePlaidLink
} from 'react-plaid-link';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import MHButton from '../Button/MHButton';
import MHDialog from '../Dialog/MHDialog';

import { ReactComponent as CheckMarkRoundedLargeIcon } from '../../static/svg/check-mark-rounded-lg.svg';
import PlaidLinkContext from '../../services/plaid-link';
import { LinkSuccessMetadata } from '../../models/plaid.model';
import AuthContext from '../../store/context/auth-context';
import { HttpResponse } from '../../models/api.interface';
import BackdropLoader from '../UI/BackdropLoader';
import NotificationContext from '../../store/context/notifications.context';

const LinkAccount = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [completed, setCompleted] = React.useState(false);
  const history = useHistory();

  const authCtx = React.useContext(AuthContext);
  const { userId } = authCtx;
  const linkCtx = React.useContext(PlaidLinkContext);
  const {
    linkToken,
    isOauth,
    generateLinkToken,
    exchangeToken,
    removeLinkToken,
    setModalAction
  } = linkCtx;

  const notificationCtx = React.useContext(NotificationContext);
  const { pushNotification } = notificationCtx;

  const onSuccess = React.useCallback(
    (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      console.log(public_token, metadata);

      exchangeToken.exchangePublicToken(
        public_token,
        (metadata as unknown) as LinkSuccessMetadata,
        userId as number,
        (response: HttpResponse<unknown>) => {
          setCompleted(true);
          history.replace('/organization/wallet');
        }
      );
      // window.history.pushState('', '', '/');
    },
    [history, exchangeToken, userId]
  );

  const onExit = React.useCallback(() => {
    onClose();
    removeLinkToken();
  }, [onClose, removeLinkToken]);

  const config: PlaidLinkOptions = {
    token: linkToken,
    onSuccess,
    onExit,
    ...(isOauth && {
      receivedRedirectUri: window.location.href
    })
  };

  const { open: openLink, ready, exit } = usePlaidLink(config);

  React.useEffect(() => {
    generateLinkToken();
    setModalAction('linkAccountOpen');
  }, [generateLinkToken, setModalAction]);

  React.useEffect(() => {
    if (ready) {
      openLink();
    }
  }, [ready, openLink]);

  React.useEffect(() => {
    if (isOauth && ready) {
      openLink();
    }
  }, [isOauth, ready, openLink]);

  React.useEffect(() => {
    if (exchangeToken.error) {
      onClose();
      pushNotification({
        type: 'error',
        message: 'An unexpected error occured while connecting your account'
      });
      exit();
    }
  }, [exchangeToken.error, exit]);

  return (
    <React.Fragment>
      {exchangeToken.loading && <BackdropLoader />}
      <MHDialog
        open={open}
        title={''}
        handleClose={onClose}
        scroll="paper"
        actions={
          !completed ? null : (
            <MHButton type="button" fullWidth onClick={onClose}>
              Close modal
            </MHButton>
          )
        }
        maxWidth={'xs'}
        fullWidth>
        {!completed ? (
          <Box
            sx={{
              px: 2,
              '& svg': {
                display: 'block'
              }
            }}>
            <Typography
              variant="h2"
              align="center"
              color="primary.main"
              gutterBottom
              paragraph>
              Link your Account
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="primary.main"
              paragraph
              gutterBottom>
              Once your account is linked we can begin scanning for care related
              transactions.
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="primary.main"
              paragraph
              gutterBottom>
              You will be redirected to Plaid to add your account shortly.
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
              You have successfully linked your account.
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="primary.main"
              paragraph
              gutterBottom>
              You will receive notifications from us when care transactions are
              flagged.
            </Typography>
          </Box>
        )}
      </MHDialog>
    </React.Fragment>
  );
};

export default LinkAccount;
