import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  PlaidLinkOnSuccessMetadata,
  PlaidLinkOptions,
  usePlaidLink
} from 'react-plaid-link';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

import BackdropLoader from '../UI/BackdropLoader';
import MHButton from '../Button/MHButton';

import { ReactComponent as BankIcon } from '../../static/svg/bank.svg';
import { ConnectedAccount } from '../../models/wallet.model';
import { LinkSuccessMetadata } from '../../models/plaid.model';
import PlaidLinkContext from '../../services/plaid-link';
import AuthContext from '../../store/context/auth-context';
import { HttpResponse } from '../../models/api.interface';

const PayoutAccount = ({
  connectedAccount,
  handleClose,
  setCompleted
}: {
  connectedAccount: ConnectedAccount | undefined;
  handleClose: () => void;
  setCompleted: (value: React.SetStateAction<boolean>) => void;
}) => {
  const isAccountLinked = connectedAccount && connectedAccount.mask;

  const history = useHistory();

  const authCtx = React.useContext(AuthContext);
  const { userId } = authCtx;

  const linkCtx = React.useContext(PlaidLinkContext);
  const {
    linkToken,
    isOauth,
    generateLinkToken,
    exchangeToken
  } = linkCtx;

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
    [history, exchangeToken, userId, setCompleted]
  );

  const onExit = React.useCallback(() => {
    handleClose();
  }, [handleClose]);

  const config: PlaidLinkOptions = {
    token: linkToken,
    onSuccess,
    onExit,
    ...(isOauth && {
      receivedRedirectUri: window.location.href
    })
  };

  const { open, ready } = usePlaidLink(config);

  React.useEffect(() => {
    generateLinkToken();
  }, [generateLinkToken]);

  React.useEffect(() => {
    if (ready && !isAccountLinked) {
      open();
    }
  }, [ready, open, isAccountLinked]);

  React.useEffect(() => {
    openPlaidLink();
  }, []);

  const openPlaidLink = React.useCallback(() => {
    if (isOauth && ready) {
      open();
    }
  }, [isOauth, ready, open]);

  return (
    <React.Fragment>
      {exchangeToken.loading && <BackdropLoader />}

      {!isAccountLinked ? (
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
            Add your Payout Account
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="primary.main"
            paragraph
            gutterBottom>
            In order to proceed with your application for reimbursement, we will
            need to verify your Payout account.
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="primary.main"
            paragraph
            gutterBottom>
            You will be redirected to Plaid to add your Payout account shortly.
          </Typography>
        </Box>
      ) : (
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
            Connected Account
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            p={2}
            bgcolor="#F4F4F4"
            mb={1}
            sx={{
              '& svg': {
                color: 'primary.main'
              }
            }}>
            <BankIcon />
            <Typography
              variant="body2"
              color="primary.main"
              paragraph
              gutterBottom>
              TD Bank Account ending with ****{connectedAccount?.mask}
            </Typography>
          </Stack>

          {/* <MuiLink
            component="button"
            color="primary"
            underline="always"
            onClick={openPlaidLink}>
            Change connected account
          </MuiLink> */}

          <MHButton
            type="button"
            sx={{
              mt: 4
            }}
            fullWidth
            onClick={() => setCompleted(true)}>
            Proceed with connected account
          </MHButton>
        </Box>
      )}
    </React.Fragment>
  );
};

export default PayoutAccount;
