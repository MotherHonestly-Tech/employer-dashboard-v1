import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import MuiLink from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import UploadReceipt from '../../components/Wallet/UploadReceipt';
import DataTable, { GridColDef } from '../../components/DataTable/MHDataTable';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
import BorderLinearProgress from '../../components/UI/LinearProgress';
import LinkAccount from '../../components/Wallet/LinkAccount';
import MHButton from '../../components/Button/MHButton';
import { MHSelect } from '../../components/Form/MHSelect';
import MHTextInput from '../../components/Form/MHTextInput';
import MHDatePicker from '../../components/Form/MHDatePicker';
import Transactions from '../../components/Wallet/Transactions';
import ReceiptStatus, {
  RECEIPT_STATUS
} from '../../components/Wallet/ReceiptStatus';
import StyledActionButton from '../../components/Button/StyledActionButton';
import useInput from '../../hooks/use-input';
import useTitle from '../../hooks/use-title';
import useHttp from '../../hooks/use-http';

import { ReactComponent as UploadReceiptIcon } from '../../static/svg/upload-receipt.svg';
import { ReactComponent as CareCardIcon } from '../../static/svg/care-card.svg';
import { ReactComponent as CardIconSm } from '../../static/svg/card-sm.svg';
import { ReactComponent as PlusIconLarge } from '../../static/svg/plus-lg.svg';
import { HttpResponse } from '../../models/api.interface';
import { Receipt } from '../../models/receipt.model';
import { formatAmount, formatDate } from '../../utils/utils';
import * as validators from '../../utils/validators';
import * as walletReducer from '../../store/reducers/wallet';
import PlaidLinkContext from '../../services/plaid-link';

type WalletReducer = (
  state: {
    uploadReceiptOpen: boolean;
    linkAccountOpen: boolean;
    transactionsOpen: boolean;
  },
  action: {
    type: string;
    id: ModalID;
    open: boolean;
  }
) => any;

type ModalID = 'uploadReceiptOpen' | 'linkAccountOpen' | 'transactionsOpen';

const GridItem = styled(Box)(({ theme }) => ({
  // ...theme.typography.body2,
  backgroundColor: '#ffffff',
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  flex: '1 1 auto',
  display: 'flex',
  justifyContent: 'center'
}));

const Container = styled(Box)(({ theme }) => ({
  flexBasis: '50%',
  '&:focus': {
    outline: 'none'
  },
  '&:active': {
    outline: 'none'
  }
}));

const Wallet = (props: { title: string }) => {
  const [walletState, dispatch] = React.useReducer<WalletReducer>(
    walletReducer.walletReducer,
    {
      uploadReceiptOpen: false,
      linkAccountOpen: false,
      transactionsOpen: false
    }
  );

  const [receipts, setReceipts] = React.useState<Receipt[]>([]);
  useTitle(props.title);

  const handleClickOpen = (id: ModalID) => {
    dispatch({
      type: walletReducer.OPEN_MODAL,
      id,
      open: true
    });
  };

  const handleClose = (id: ModalID) => {
    dispatch({
      type: walletReducer.OPEN_MODAL,
      id,
      open: false
    });
  };

  const {
    value: enteredStatus,
    valid: enteredStatusIsValid,
    error: enteredStatusHasError,
    onChange: statusInputChangeHandler,
    onBlur: statusInputBlurHandler,
    markAsTouched: markStatusInputAsTouched
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const plaidLinkCtx = React.useContext(PlaidLinkContext);
  const { isOauth } = plaidLinkCtx;

  React.useEffect(() => {
    isOauth &&
      dispatch({
        type: walletReducer.OPEN_MODAL,
        id: 'uploadReceiptOpen',
        open: true
      });
  }, []);

  function createData(
    merchantName: string,
    merchantImgSrc: string,
    category: string,
    expenseDesc: string,
    expenseAmt: number,
    balanceAfterExpense: number
  ) {
    return {
      merchantName,
      merchantImgSrc,
      category,
      expenseDesc,
      expenseAmt,
      balanceAfterExpense
    };
  }

  const columns: GridColDef[] = [
    {
      field: 'merchantName',
      headerName: 'Merchant',
      width: 200,
      type: 'text',
      cellRenderer: (row: Receipt) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            alt={row.merchantName}
            src={row.logoUrl}
            variant="rounded"
            sx={{ width: 35, height: 35 }}
          />
          <Typography
            variant="body1"
            color="primary.main"
            sx={{
              fontWeight: 800
            }}>
            {row.merchantName}
          </Typography>
        </Stack>
      )
    },
    {
      field: 'categoryName',
      headerName: 'Category',
      width: 100,
      type: 'text'
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 100,
      type: 'text',
      valueGetter: (row: Receipt) => formatAmount(row.amount)
    },
    {
      field: 'createdDate',
      headerName: 'Date',
      width: 100,
      type: 'text',
      valueGetter: (row: Receipt) => formatDate(row.createdDate)
    },
    {
      field: 'workFlowId',
      headerName: 'Status',
      width: 100,
      type: 'number',
      cellRenderer: (row: Receipt) => (
        <ReceiptStatus status={row.workFlowId}></ReceiptStatus>
      )
    },
    {
      field: 'workFlowId',
      headerName: 'Progress',
      width: 100,
      type: 'number',
      cellRenderer: (row: Receipt) => (
        <BorderLinearProgress
          variant="determinate"
          barcolor={RECEIPT_STATUS[row.workFlowId].color}
          value={(row.workFlowId / 5) * 100}
        />
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      align: 'center',
      type: 'text',
      cellRenderer: (row: Receipt) => (
        <MuiLink
          href={`/receipts/${row.id}`}
          color="primary"
          sx={{
            fontWeight: 800
          }}>
          View
        </MuiLink>
      )
    }
  ];

  const { loading, error, sendHttpRequest } = useHttp();

  React.useEffect(() => {
    sendHttpRequest(
      process.env.REACT_APP_API_BASE_URL +
        'employee/dashboard/reembursement/search',
      {},
      (response: HttpResponse<Receipt[]>) => {
        setReceipts(response.data);
      }
    );
  }, []);

  if (loading) {
    return (
      <Stack minHeight="75vh" justifyContent="center" alignItems="center">
        <LoadingIndicator />
      </Stack>
    );
  }

  return (
    <React.Fragment>
      <div>
        <Typography variant="h1" align="center" color="primary" gutterBottom>
          My Care Wallet
        </Typography>
        <Typography variant="body1" align="center" color="#9C9C9C" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </Typography>
        <Paper
          sx={{
            p: 2,
            my: 6,
            borderRadius: 2
          }}>
          <Typography
            variant="subtitle1"
            align="center"
            color="primary"
            fontWeight={'bold'}
            gutterBottom>
            Personal Care Wallet Credit Breakdown
          </Typography>

          <Divider
            variant="middle"
            sx={{
              my: 1.5
            }}
          />

          <Stack
            direction="row"
            alignItems={'center'}
            divider={
              <Divider orientation="vertical" variant="middle" flexItem />
            }
            spacing={2}>
            <GridItem>
              <Box>
                <Typography variant="body2" fontSize={12} color="primary">
                  Monthly Credit
                </Typography>
                <Typography variant="h4" fontSize={36} color="primary">
                  $83.00
                </Typography>
              </Box>
            </GridItem>
            <GridItem>
              <Box>
                <Typography variant="body2" fontSize={12} color="#BDBDBD">
                  Credit Balance
                </Typography>
                <Typography variant="h4" fontSize={36} color="#BDBDBD">
                  $0.00
                </Typography>
              </Box>
            </GridItem>
            <GridItem>
              <Box>
                <Typography variant="body2" fontSize={12} color="#BDBDBD">
                  Total Payout
                </Typography>
                <Typography variant="h4" fontSize={36} color="#BDBDBD">
                  $0.00
                </Typography>
              </Box>
            </GridItem>
          </Stack>
        </Paper>

        {receipts.length === 0 ? (
          <Box
            height={300}
            width="100%"
            border={'thin'}
            borderColor={(theme) => theme.palette.grey[900]}
            borderRadius={2}
            sx={{
              borderStyle: 'dashed'
            }}>
            <Stack
              direction="row"
              alignItems={'center'}
              height="100%"
              divider={
                <Divider orientation="vertical" variant="middle" flexItem />
              }
              spacing={2}>
              <Container
                component={'button'}
                onClick={() => handleClickOpen('uploadReceiptOpen')}>
                <Typography
                  variant="h3"
                  align="center"
                  color="#28404A"
                  gutterBottom>
                  Upload Your Receipt
                </Typography>

                <Box
                  border={5}
                  borderColor="#E5E5E5"
                  p={3}
                  width={200}
                  textAlign="center"
                  borderRadius={(theme) => theme.shape.borderRadius}
                  mt={3}
                  mx="auto"
                  sx={{
                    '& svg': {
                      margin: 'auto'
                    }
                  }}>
                  <UploadReceiptIcon />
                  <MuiLink component={'p'} variant="body2" mt={2}>
                    Upload receipt
                  </MuiLink>
                </Box>
              </Container>
              <Container
                component={'button'}
                onClick={() => handleClickOpen('linkAccountOpen')}>
                {' '}
                <Typography
                  variant="h3"
                  align="center"
                  color="#28404A"
                  gutterBottom>
                  Link your account
                </Typography>
                <Box
                  border={5}
                  borderColor="#E5E5E5"
                  p={3}
                  width={200}
                  textAlign="center"
                  borderRadius={(theme) => theme.shape.borderRadius}
                  mt={3}
                  mx="auto"
                  sx={{
                    '& svg': {
                      margin: 'auto'
                    }
                  }}>
                  <CareCardIcon />
                  <MuiLink component={'p'} variant="body2" mt={2}>
                    Link account
                  </MuiLink>
                </Box>
              </Container>
            </Stack>
          </Box>
        ) : (
          <React.Fragment>
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Stack direction="row" spacing={2}>
                <StyledActionButton
                  onClick={() => handleClickOpen('uploadReceiptOpen')}>
                  Upload receipt
                </StyledActionButton>
                <StyledActionButton
                  onClick={() => handleClickOpen('linkAccountOpen')}>
                  Link an account
                </StyledActionButton>
              </Stack>

              <div className="relative">
                <StyledActionButton
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleClickOpen('transactionsOpen')}>
                  199 eligible transactions
                </StyledActionButton>

                <span className="absolute flex h-3 w-3 -top-1 -right-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#28404A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#28404A]"></span>
                </span>
              </div>
            </Stack>

            <Divider light />

            <Grid container mt={2} spacing={1}>
              <Grid item xs={3} position="relative">
                <MHSelect
                  placeholder="Status"
                  options={Object.keys(RECEIPT_STATUS).map((statusKey) => ({
                    value: statusKey,
                    label: RECEIPT_STATUS[statusKey as any].text
                  }))}
                  value={enteredStatus}
                  onChange={(val) => statusInputChangeHandler(val as string)}
                  onBlur={statusInputBlurHandler}
                  popperWidth="100%"
                />
              </Grid>
              <Grid item xs={3} position="relative">
                <MHDatePicker />
              </Grid>
            </Grid>

            <DataTable rows={receipts} columns={columns} />
          </React.Fragment>
        )}
      </div>

      {walletState.uploadReceiptOpen && (
        <UploadReceipt
          open={walletState.uploadReceiptOpen}
          onClose={() => handleClose('uploadReceiptOpen')}
        />
      )}

      {walletState.linkAccountOpen && (
        <LinkAccount
          open={walletState.linkAccountOpen}
          onClose={() => handleClose('linkAccountOpen')}
        />
      )}

      {walletState.transactionsOpen && (
        <Transactions
          open={walletState.transactionsOpen}
          onClose={() => handleClose('transactionsOpen')}
        />
      )}
    </React.Fragment>
  );
};

export default Wallet;
