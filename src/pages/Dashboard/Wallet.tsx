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
import ReceiptStatus, {
  RECEIPT_STATUS
} from '../../components/Wallet/ReceiptStatus';
import PlaidLinkContext from '../../services/plaid-link';
import MHTextInput from '../../components/Form/MHTextInput';
import MHDatePicker from '../../components/Form/MHDatePicker';

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
  const [open, setOpen] = React.useState<boolean>(false);
  const [linkAccountOpen, setLinkAccountOpen] = React.useState<boolean>(false);

  const [receipts, setReceipts] = React.useState<Receipt[]>([]);
  useTitle(props.title);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLinkAccountOpen = () => {
    setLinkAccountOpen(true);
  };

  const handleLinkAccountClose = () => {
    setLinkAccountOpen(false);
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
    isOauth && setOpen(true);
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

  const rows = [
    createData(
      'Merchant 1',
      'https://www.google.com',
      'Food',
      'Expense Description',
      100,
      200
    )
  ];

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
              <Container component={'button'} onClick={handleClickOpen}>
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
              <Container component={'button'} onClick={handleLinkAccountOpen}>
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
                <StyledActionButton onClick={handleClickOpen}>
                  Upload receipt
                </StyledActionButton>
                <StyledActionButton onClick={handleLinkAccountOpen}>
                  Link an account
                </StyledActionButton>
              </Stack>

              <MHButton
                type="button"
                variant="outlined"
                sx={{ p: '5px 12px' }}
                color="secondary">
                32 eligible transactions
              </MHButton>
            </Stack>

            <Divider light />

            <Grid container mt={2} spacing={1}>
              <Grid item xs={3}>
                <MHSelect
                  placeholder="Status"
                  options={[]}
                  value={enteredStatus}
                  onChange={(val) => statusInputChangeHandler(val as string)}
                  onBlur={statusInputBlurHandler}
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

      {/* <DataTable rows={rows} columns={columns} /> */}

      {open && <UploadReceipt open={open} onClose={handleClose} />}

      {linkAccountOpen && (
        <LinkAccount open={linkAccountOpen} onClose={handleLinkAccountClose} />
      )}
    </React.Fragment>
  );
};

const StyledActionButton = styled(MHButton)(({ theme }) => ({
  fontSize: '12px',
  padding: '5px 12px',
  '& svg': {
    mr: 1
  },
  '&:hover svg': {
    color: theme.palette.primary.main
  }
}));

export default Wallet;
