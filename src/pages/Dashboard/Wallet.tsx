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
import { MHSelect } from '../../components/Form/MHSelect';
import MHDatePicker from '../../components/Form/MHDatePicker';
import Transactions from '../../components/Wallet/Transactions';
import ReceiptStatus, {
  RECEIPT_STATUS
} from '../../components/Wallet/ExpenseStatus';
import StyledActionButton from '../../components/Button/StyledActionButton';
import useInput from '../../hooks/use-input';
import useTitle from '../../hooks/use-title';
import useHttp from '../../hooks/use-http';

import { ReactComponent as ReimburseIcon } from '../../static/svg/reimburse.svg';
import { ReactComponent as UploadReceiptIcon } from '../../static/svg/upload-receipt.svg';
import { ReactComponent as CareCardIcon } from '../../static/svg/care-card.svg';
import { ReactComponent as CardIconSm } from '../../static/svg/card-sm.svg';
import { ReactComponent as PlusIconLarge } from '../../static/svg/plus-lg.svg';
import { HttpResponse } from '../../models/api.interface';
import { CareWallet, Expense } from '../../models/wallet.model';
import {
  formatAmount,
  formatDate,
  getURLWithQueryParams
} from '../../utils/utils';
import * as validators from '../../utils/validators';
import * as walletReducer from '../../store/reducers/wallet';
import PlaidLinkContext from '../../services/plaid-link';
import AuthContext from '../../store/context/auth-context';
import ExpenseModal from '../../components/Wallet/ExpenseModal';
import DashboardContext from '../../store/context/dashboard.context';

type WalletReducer = (
  state: {
    uploadReceiptOpen: boolean;
    linkAccountOpen: boolean;
    transactionsOpen: boolean;
    expenseOpen: boolean;
  },
  action: {
    type: string;
    id: ModalID;
    open: boolean;
  }
) => any;

export type ModalID =
  | 'uploadReceiptOpen'
  | 'linkAccountOpen'
  | 'transactionsOpen'
  | 'expenseOpen';

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
      transactionsOpen: false,
      expenseOpen: false
    }
  );

  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  const [chosenExpense, setChosenExpense] = React.useState<Expense | null>(
    null
  );
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

  const authCtx = React.useContext(AuthContext);
  const { userId } = authCtx;

  const plaidLinkCtx = React.useContext(PlaidLinkContext);
  const { isOauth } = plaidLinkCtx;

  const dashboardCtx = React.useContext(DashboardContext);
  const { computeCategoryExpenses } = dashboardCtx;

  React.useEffect(() => {
    isOauth &&
      dispatch({
        type: walletReducer.OPEN_MODAL,
        id:
          (localStorage.getItem('modal_action') as ModalID) ||
          'uploadReceiptOpen',
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
      cellRenderer: (row: Expense) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            alt={row.merchantName}
            src={row.logoUrl}
            variant="rounded"
            sx={{
              width: 35,
              height: 35,
              bgcolor: '#ffffff',
              '& img': {
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center'
              }
            }}
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
      valueGetter: (row: Expense) => formatAmount(row.amount)
    },
    {
      field: 'createdDate',
      headerName: 'Date',
      width: 100,
      type: 'text',
      valueGetter: (row: Expense) => formatDate(row.createdDate)
    },
    {
      field: 'workFlowId',
      headerName: 'Status',
      width: 100,
      type: 'number',
      cellRenderer: (row: Expense) => (
        <ReceiptStatus status={row.workFlowId}></ReceiptStatus>
      )
    },
    {
      field: 'workFlowId',
      headerName: 'Progress',
      width: 100,
      type: 'number',
      cellRenderer: (row: Expense) => (
        <BorderLinearProgress
          variant="determinate"
          barcolor={RECEIPT_STATUS[row.workFlowId].color}
          value={(row.workFlowId / 3) * 100}
        />
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      align: 'center',
      type: 'text',
      cellRenderer: (row: Expense) => (
        <MuiLink
          component="button"
          color="primary"
          underline="always"
          sx={{
            fontWeight: 800
          }}
          onClick={() => {
            handleClickOpen('expenseOpen');
            setChosenExpense(row);
          }}>
          View
        </MuiLink>
      )
    }
  ];

  const [wallet, setWallet] = React.useState<CareWallet | null>(null);

  const {
    loading: loadingExpenses,
    error,
    sendHttpRequest: getExpenses
  } = useHttp();
  const {
    loading: loadingWallet,
    error: walletError,
    sendHttpRequest: fetchWallet
  } = useHttp();

  React.useEffect(() => {
    getCareWallet();
    getExpenseTransactions();
  }, []);

  const getExpenseTransactions = () => {
    getExpenses(
      getURLWithQueryParams(
        process.env.REACT_APP_API_BASE_URL +
          'employee/dashboard/reembursement/search',
        {
          customerId: String(userId!)
        }
      ),
      {},
      (response: HttpResponse<Expense[]>) => {
        const mappedExpenses = response.data.map((item) => ({
          ...item
        }));
        setExpenses(response.data);
      }
    );
  };

  const getCareWallet = () => {
    fetchWallet(
      getURLWithQueryParams(process.env.REACT_APP_PLAID_API_URL + 'wallet', {
        customerId: String(userId!)
      }),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      ({ data }: HttpResponse<CareWallet>) => {
        setWallet(data);
        computeCategoryExpenses(
          data.expensePerCategory,
          data.numOfApprovedReembursement
        );
      }
    );
  };

  if (loadingExpenses || loadingWallet) {
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
          My Work-Life Wallet
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
            Personal Work-Life Wallet Credit Breakdown
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
                {/* formatAmount(wallet.monthlyAllocation) */}
                <Typography variant="h4" fontSize={36} color="primary">
                  {wallet && formatAmount(100)}
                </Typography>
              </Box>
            </GridItem>
            <GridItem>
              <Box>
                <Typography variant="body2" fontSize={12} color="#BDBDBD">
                  Wallet Balance
                </Typography>
                {/* wallet.walletBalance */}
                <Typography variant="h4" fontSize={36} color="#BDBDBD">
                  {wallet && formatAmount(320)}
                </Typography>
              </Box>
            </GridItem>
            <GridItem>
              <Box>
                <Typography variant="body2" fontSize={12} color="#BDBDBD">
                  Total Payout
                </Typography>
                {/* wallet.totalPayoutAmount */}
                <Typography variant="h4" fontSize={36} color="#BDBDBD">
                  {wallet && formatAmount(280)}
                </Typography>
              </Box>
            </GridItem>
          </Stack>
        </Paper>

        {expenses.length === 0 ? (
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
                {/* && !wallet.connectedAccount.mask */}
                {wallet ? (
                  <StyledActionButton
                    onClick={() => handleClickOpen('linkAccountOpen')}>
                    {!wallet.connectedAccount.mask
                      ? 'Link an account'
                      : 'Change linked account'}
                  </StyledActionButton>
                ) : null}
              </Stack>

              {/* */}
              {wallet && wallet.totalFlaggedTrnx ? (
                <div className="relative">
                  <StyledActionButton
                    variant="outlined"
                    color="secondary"
                    startIcon={<ReimburseIcon />}
                    onClick={() => handleClickOpen('transactionsOpen')}>
                    {wallet.totalFlaggedTrnx} Eligible transactions
                  </StyledActionButton>

                  <span className="absolute flex h-3 w-3 -top-1 -right-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#28404A] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#28404A]"></span>
                  </span>
                </div>
              ) : null}
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

            <DataTable rows={expenses} columns={columns} frontEndPagination />
          </React.Fragment>
        )}
      </div>

      {walletState.uploadReceiptOpen && (
        <UploadReceipt
          open={walletState.uploadReceiptOpen}
          onClose={() => handleClose('uploadReceiptOpen')}
          wallet={wallet}
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

      {walletState.expenseOpen && (
        <ExpenseModal
          open={walletState.expenseOpen}
          onClose={() => handleClose('expenseOpen')}
          expense={chosenExpense}
        />
      )}
    </React.Fragment>
  );
};

export default Wallet;
