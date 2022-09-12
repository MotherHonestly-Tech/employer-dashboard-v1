import React from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { SelectOption } from '@mui/base';

import MHDialog from '../Dialog/MHDialog';
import LoadingIndicator from '../UI/LoadingIndicator';
import MHDataTable, { GridColDef } from '../DataTable/MHDataTable';
import StyledActionButton from '../Button/StyledActionButton';
import MHFormControl from '../Form/MHFormControl';
import { MHSelect } from '../Form/MHSelect';
import useHttp from '../../hooks/use-http';
import useInput from '../../hooks/use-input';

import { ReactComponent as ReimburseIcon } from '../../static/svg/reimburse.svg';
import { ReactComponent as CloseIcon } from '../../static/svg/cancel.svg';
import {
  formatAmount,
  formatDate,
  getURLWithQueryParams,
  resolveErrorMessage
} from '../../utils/utils';
import { HttpResponse } from '../../models/api.interface';
import { Transaction } from '../../models/plaid.model';
import * as validators from '../../utils/validators';
import DashboardContext from '../../store/context/dashboard.context';
import MHRadioGroup from '../Form/MHRadioGroup';
import IconButtonStyled from '../Button/IconButtonStyled';
import MHButton from '../Button/MHButton';

const RADIO_OPTIONS: Array<{ value: string; label: string }> = [
  {
    value: 'full',
    label: 'Full Reimbursement'
  },
  {
    value: 'partial',
    label: 'Partial Reimbursement'
  }
];

const Transactions = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const { loading, error, sendHttpRequest: fetchTransactions } = useHttp();

  const [transactionId, setTransactionId] = React.useState<number | null>(null);

  React.useEffect(() => {
    fetchTransactions(
      getURLWithQueryParams(
        process.env.REACT_APP_PLAID_API_URL + 'plaid/transaction',
        {
          customerId: '123312'
        }
      ),
      {
        method: 'GET'
      },
      (response: HttpResponse<Transaction[]>) => {
        console.info(response);
        setTransactions(response.data);
      }
    );
  }, [fetchTransactions]);

  const columns: GridColDef[] = [
    {
      headerName: 'Merchant',
      field: 'merchantName',
      type: 'text',
      width: 150
    },
    {
      headerName: 'Expense Type',
      field: 'financeCategoryDetailed',
      type: 'text',
      width: 150
    },
    {
      headerName: 'Amount',
      field: 'amount',
      type: 'text',
      width: 100,
      valueGetter: (row: Transaction) => formatAmount(row.amount)
    },
    {
      headerName: 'Date',
      field: 'TransactionDate',
      type: 'text',
      width: 100,
      valueGetter: (row: Transaction) => formatDate(row.TransactionDate)
    },
    {
      headerName: '',
      field: 'action',
      type: 'text',
      width: 100,
      cellRenderer: (row: Transaction) => (
        <StyledActionButton
          variant="outlined"
          color="secondary"
          startIcon={<ReimburseIcon />}
          onClick={() => setTransactionId(row.id)}>
          Reimburse
        </StyledActionButton>
      )
    }
  ];

  const dashboardCtx = React.useContext(DashboardContext);
  const { staticDataCacheMap } = dashboardCtx;

  const {
    value: enteredCategory,
    valid: enteredCategoryIsValid,
    onChange: categoryInputChangeHandler,
    onBlur: categoryInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const {
    value: enteredAmount,
    valid: enteredAmountIsValid,
    error: enteredAmountHasError,
    onChange: amountInputChangeHandler,
    onBlur: amountInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const {
    value: enteredDesc,
    onChange: descInputChangeHandler,
    onBlur: descInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const {
    value: enteredType,
    valid: enteredTypeIsValid,
    onChange: typeInputChangeHandler,
    onBlur: typeInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  let amountErrorTip = resolveErrorMessage(enteredAmountHasError)(
    'Please enter a valid amount'
  );

  const submitHandler = (event: React.SyntheticEvent<HTMLFormElement>) => {};

  // if (loading) {
  //   return (
  //     <Stack minHeight="50vh" justifyContent="center" alignItems="center">
  //       <LoadingIndicator />
  //     </Stack>
  //   );
  // }

  return (
    <React.Fragment>
      <MHDialog
        open={open}
        title={' '}
        handleClose={onClose}
        scroll="paper"
        actions={null}
        maxWidth={'lg'}
        fullWidth>
        <Typography
          variant="body1"
          fontSize="16px"
          fontFamily="Area-Normal-Black"
          color="primary.main">
          Reimbursement
        </Typography>
        <Typography variant="body2" gutterBottom>
          Please note, we only reimburse care related expenses
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={transactionId ? 9 : 12}>
            <MHDataTable
              rows={transactions}
              columns={columns}
              containerStyles={{
                borderWidth: 0,
                borderRadius: 0,
                marginTop: '30px'
              }}
              headerStyles={{
                background: '#E8E8E8',
                borderWidth: 0,
                fontSize: '0.75rem',
                color: '#A2A2A2',
                padding: '6px 10px'
              }}
              bodyStyles={{
                borderColor: '#E6E6E6'
              }}
            />
          </Grid>

          {transactionId && (
            <Grid
              item
              xs={3}
              position="sticky"
              height="90%"
              sx={{
                top: 0
              }}>
              <Box
                component={'form'}
                onSubmit={submitHandler}
                id="upload-receipt-form">
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="space-between">
                  <Typography
                    variant="body1"
                    fontSize="1.2rem"
                    fontFamily="Area-Normal-Black"
                    gutterBottom
                    color="primary.main">
                    Edit transaction
                  </Typography>

                  <IconButtonStyled
                    aria-label="close"
                    onClick={() => setTransactionId(null)}>
                    <CloseIcon width="1.2em" />
                  </IconButtonStyled>
                </Stack>

                <MHSelect
                  label="Select a Category"
                  placeholder="Pick a category"
                  options={
                    (staticDataCacheMap.get('categories') as SelectOption<
                      string
                    >[]) || []
                  }
                  value={enteredCategory}
                  onChange={(val) => categoryInputChangeHandler(val as string)}
                  onBlur={categoryInputBlurHandler}
                  popperWidth="200px"
                />

                <MHRadioGroup
                  id="reimbursement-type"
                  name="reimbursement-type"
                  value={enteredType}
                  onChange={(e) => {
                    typeInputChangeHandler(e);
                    amountInputChangeHandler('');
                  }}
                  options={RADIO_OPTIONS}
                />

                {enteredType === 'partial' && (
                  <MHFormControl
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    label="Amount ($)"
                    value={enteredAmount}
                    onChange={amountInputChangeHandler}
                    onBlur={amountInputBlurHandler}
                    error={amountErrorTip}
                    min={0}
                  />
                )}

                <MHFormControl
                  id="desc"
                  label="Expense Description"
                  placeholder="Tell us a little about this expense"
                  type="text"
                  value={enteredDesc}
                  onChange={descInputChangeHandler}
                  onBlur={descInputBlurHandler}
                  multiline
                  rows={8}
                />

                <MHButton type="submit" fullWidth>
                  Proceed
                </MHButton>
              </Box>
            </Grid>
          )}
        </Grid>
      </MHDialog>
    </React.Fragment>
  );
};

export default Transactions;
