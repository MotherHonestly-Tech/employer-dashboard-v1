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
import MHRadioGroup from '../Form/MHRadioGroup';
import IconButtonStyled from '../Button/IconButtonStyled';
import MHButton from '../Button/MHButton';
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
import { Category } from '../../models/wallet.model';
import AuthContext from '../../store/context/auth-context';
import NotificationContext from '../../store/context/notifications.context';

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

const TRANSACTIONS: Transaction[] = [
  {
    'id': 1,
    'fullName': 'Plaid Gold Standard 0% Interest Checking',
    'address': '',
    'paymentMethod': '',
    'paymentChannel': 'in store',
    'paymentProcessor': '',
    'longitude': 0,
    'latitude': 0,
    'AccountId': 'XXARodR7bVtZNeBJ4llyHPp9e6QdbwfyAXN6r',
    'customerId': 123312,
    'transactionRefId': '4qWd6Rd7nktZ4BP6nEEwHb3DglmrGzFnQezaz',
    'currencyCode': 'USD',
    'amount': 19.5,
    'merchantName': 'Care.com',
    'processed': false,
    'financeCategoryDetailed': 'PERSONAL_CARE_OTHER_PERSONAL_CARE',
    'financeCategoryPrimary': 'FOOD_AND_DRINK',
    'TransactionDate': new Date('2022-08-29')
  },
  {
    'id': 2,
    'fullName': 'Plaid Gold Standard 0% Interest Checking',
    'address': '',
    'paymentMethod': '',
    'paymentChannel': 'in store',
    'paymentProcessor': '',
    'longitude': 0,
    'latitude': 0,
    'AccountId': 'XXARodR7bVtZNeBJ4llyHPp9e6QdbwfyAXN6r',
    'customerId': 123312,
    'transactionRefId': '4qWd6Rd7nktZ4BP6nEEwHb3DglmrGzFnQezaz',
    'currencyCode': 'USD',
    'amount': 89.4,
    'merchantName': 'Vivvi',
    'processed': false,
    'financeCategoryDetailed': 'GENERAL_SERVICES_CHILDCARE',
    'financeCategoryPrimary': 'FOOD_AND_DRINK',
    'TransactionDate': new Date('2022-08-29')
  },
  {
    'id': 3,
    'fullName': 'Plaid Gold Standard 0% Interest Checking',
    'address': '',
    'paymentMethod': '',
    'paymentChannel': 'in store',
    'paymentProcessor': '',
    'longitude': 0,
    'latitude': 0,
    'AccountId': 'XXARodR7bVtZNeBJ4llyHPp9e6QdbwfyAXN6r',
    'customerId': 123312,
    'transactionRefId': '4qWd6Rd7nktZ4BP6nEEwHb3DglmrGzFnQezaz',
    'currencyCode': 'USD',
    'amount': 24.0,
    'merchantName': 'Care.com',
    'processed': false,
    'financeCategoryDetailed': 'PERSONAL_CARE_OTHER_PERSONAL_CARE',
    'financeCategoryPrimary': 'FOOD_AND_DRINK',
    'TransactionDate': new Date('2022-08-29')
  },
  {
    'id': 4,
    'fullName': 'Plaid Gold Standard 0% Interest Checking',
    'address': '',
    'paymentMethod': '',
    'paymentChannel': 'in store',
    'paymentProcessor': '',
    'longitude': 0,
    'latitude': 0,
    'AccountId': 'XXARodR7bVtZNeBJ4llyHPp9e6QdbwfyAXN6r',
    'customerId': 123312,
    'transactionRefId': '4qWd6Rd7nktZ4BP6nEEwHb3DglmrGzFnQezaz',
    'currencyCode': 'USD',
    'amount': 4.33,
    'merchantName': 'Splendid Spoon',
    'processed': false,
    'financeCategoryDetailed': 'FOOD_AND_DRINK_OTHER_FOOD_AND_DRINK',
    'financeCategoryPrimary': 'FOOD_AND_DRINK',
    'TransactionDate': new Date('2022-08-29')
  },
  {
    'id': 5,
    'fullName': 'Plaid Gold Standard 0% Interest Checking',
    'address': '',
    'paymentMethod': '',
    'paymentChannel': 'in store',
    'paymentProcessor': '',
    'longitude': 0,
    'latitude': 0,
    'AccountId': 'XXARodR7bVtZNeBJ4llyHPp9e6QdbwfyAXN6r',
    'customerId': 123312,
    'transactionRefId': '4qWd6Rd7nktZ4BP6nEEwHb3DglmrGzFnQezaz',
    'currencyCode': 'USD',
    'amount': 17.55,
    'merchantName': 'Rover',
    'processed': false,
    'financeCategoryDetailed': 'GENERAL_MERCHANDISE_PET_SUPPLIES',
    'financeCategoryPrimary': 'FOOD_AND_DRINK',
    'TransactionDate': new Date('2022-08-29')
  },
  {
    'id': 6,
    'fullName': 'Plaid Gold Standard 0% Interest Checking',
    'address': '',
    'paymentMethod': '',
    'paymentChannel': 'in store',
    'paymentProcessor': '',
    'longitude': 0,
    'latitude': 0,
    'AccountId': 'XXARodR7bVtZNeBJ4llyHPp9e6QdbwfyAXN6r',
    'customerId': 123312,
    'transactionRefId': '4qWd6Rd7nktZ4BP6nEEwHb3DglmrGzFnQezaz',
    'currencyCode': 'USD',
    'amount': 54.12,
    'merchantName': 'Edify',
    'processed': false,
    'financeCategoryDetailed': 'GENERAL_SERVICES_EDUCATION',
    'financeCategoryPrimary': 'FOOD_AND_DRINK',
    'TransactionDate': new Date('2022-08-29')
  },
  {
    'id': 7,
    'fullName': 'Plaid Gold Standard 0% Interest Checking',
    'address': '',
    'paymentMethod': '',
    'paymentChannel': 'in store',
    'paymentProcessor': '',
    'longitude': 0,
    'latitude': 0,
    'AccountId': 'XXARodR7bVtZNeBJ4llyHPp9e6QdbwfyAXN6r',
    'customerId': 123312,
    'transactionRefId': '4qWd6Rd7nktZ4BP6nEEwHb3DglmrGzFnQezaz',
    'currencyCode': 'USD',
    'amount': 8.57,
    'merchantName': 'Splendid Spoon',
    'processed': false,
    'financeCategoryDetailed': 'FOOD_AND_DRINK_OTHER_FOOD_AND_DRINK',
    'financeCategoryPrimary': 'FOOD_AND_DRINK',
    'TransactionDate': new Date('2022-08-31')
  },
  {
    'id': 8,
    'fullName': 'Plaid Gold Standard 0% Interest Checking',
    'address': '',
    'paymentMethod': '',
    'paymentChannel': 'in store',
    'paymentProcessor': '',
    'longitude': 0,
    'latitude': 0,
    'AccountId': 'XXARodR7bVtZNeBJ4llyHPp9e6QdbwfyAXN6r',
    'customerId': 123312,
    'transactionRefId': '4qWd6Rd7nktZ4BP6nEEwHb3DglmrGzFnQezaz',
    'currencyCode': 'USD',
    'amount': 12,
    'merchantName': 'Papa',
    'processed': false,
    'financeCategoryDetailed': 'PERSONAL_CARE_OTHER_PERSONAL_CARE',
    'financeCategoryPrimary': 'FOOD_AND_DRINK',
    'TransactionDate': new Date('2022-08-29')
  },
  {
    'id': 9,
    'fullName': 'Plaid Gold Standard 0% Interest Checking',
    'address': '',
    'paymentMethod': '',
    'paymentChannel': 'in store',
    'paymentProcessor': '',
    'longitude': 0,
    'latitude': 0,
    'AccountId': 'XXARodR7bVtZNeBJ4llyHPp9e6QdbwfyAXN6r',
    'customerId': 123312,
    'transactionRefId': '4qWd6Rd7nktZ4BP6nEEwHb3DglmrGzFnQezaz',
    'currencyCode': 'USD',
    'amount': 20.12,
    'merchantName': 'Handy',
    'processed': false,
    'financeCategoryDetailed': 'PERSONAL_CARE_LAUNDRY_AND_DRY_CLEANING',
    'financeCategoryPrimary': 'FOOD_AND_DRINK',
    'TransactionDate': new Date('2022-08-29')
  },
  {
    'id': 10,
    'fullName': 'Plaid Gold Standard 0% Interest Checking',
    'address': '',
    'paymentMethod': '',
    'paymentChannel': 'in store',
    'paymentProcessor': '',
    'longitude': 0,
    'latitude': 0,
    'AccountId': 'XXARodR7bVtZNeBJ4llyHPp9e6QdbwfyAXN6r',
    'customerId': 123312,
    'transactionRefId': '4qWd6Rd7nktZ4BP6nEEwHb3DglmrGzFnQezaz',
    'currencyCode': 'USD',
    'amount': 44.50,
    'merchantName': 'Bobbie',
    'processed': false,
    'financeCategoryDetailed': 'GENERAL_SERVICES_CHILDCARE',
    'financeCategoryPrimary': 'FOOD_AND_DRINK',
    'TransactionDate': new Date('2022-08-29')
  },
  {
    'id': 11,
    'fullName': 'Plaid Gold Standard 0% Interest Checking',
    'address': '',
    'paymentMethod': '',
    'paymentChannel': 'in store',
    'paymentProcessor': '',
    'longitude': 0,
    'latitude': 0,
    'AccountId': 'XXARodR7bVtZNeBJ4llyHPp9e6QdbwfyAXN6r',
    'customerId': 123312,
    'transactionRefId': '4qWd6Rd7nktZ4BP6nEEwHb3DglmrGzFnQezaz',
    'currencyCode': 'USD',
    'amount': 19.20,
    'merchantName': 'Handy',
    'processed': false,
    'financeCategoryDetailed': 'PERSONAL_CARE_LAUNDRY_AND_DRY_CLEANING',
    'financeCategoryPrimary': 'FOOD_AND_DRINK',
    'TransactionDate': new Date('2022-08-31')
  },
  {
    'id': 12,
    'fullName': 'Plaid Gold Standard 0% Interest Checking',
    'address': '',
    'paymentMethod': '',
    'paymentChannel': 'in store',
    'paymentProcessor': '',
    'longitude': 0,
    'latitude': 0,
    'AccountId': 'XXARodR7bVtZNeBJ4llyHPp9e6QdbwfyAXN6r',
    'customerId': 123312,
    'transactionRefId': '4qWd6Rd7nktZ4BP6nEEwHb3DglmrGzFnQezaz',
    'currencyCode': 'USD',
    'amount': 34.50,
    'merchantName': 'Bobbie',
    'processed': false,
    'financeCategoryDetailed': 'GENERAL_SERVICES_CHILDCARE',
    'financeCategoryPrimary': 'FOOD_AND_DRINK',
    'TransactionDate': new Date('2022-08-29')
  },
] as Array<Transaction>;

const MERCHANT_CATEGORIES = [
  'PERSONAL_CARE',
  'GENERAL_SERVICES_CHILDCARE',
  'GENERAL_SERVICES_ELDERCARE',
  'GENERAL_MERCHANDISE_PET_SUPPLIES',
  'HOME_IMPROVEMENT_REPAIR_AND_MAINTENANCE',
  'PERSONAL_CARE'
];

const Transactions = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [transactionId, setTransactionId] = React.useState<number | null>(null);
  const {
    loading: loadingTransactions,
    error: transactionsError,
    sendHttpRequest: fetchTransactions
  } = useHttp();

  const dashboardCtx = React.useContext(DashboardContext);
  const { staticDataCacheMap } = dashboardCtx;

  const authCtx = React.useContext(AuthContext);
  const { userId } = authCtx;

  const notificationCtx = React.useContext(NotificationContext);
  const { pushNotification } = notificationCtx;

  //
  React.useEffect(() => {
    fetchTransactions(
      getURLWithQueryParams(
        process.env.REACT_APP_PLAID_API_URL + 'plaid/transaction',
        {
          customerId: String(userId!)
        }
      ),
      {
        method: 'GET'
      },
      (response: HttpResponse<Transaction[]>) => {
        const mappedTrans = response.data.map((item) => ({
          ...item
        }));

        setTransactions(TRANSACTIONS);
      }
    );
  }, [fetchTransactions, userId]);

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
          color={transactionId !== row.id ? 'secondary' : 'primary'}
          startIcon={<ReimburseIcon />}
          onClick={setSelectedTransaction.bind(null, row.id)}>
          Reimburse
        </StyledActionButton>
      )
    }
  ];

  const setSelectedTransaction = (id: number) => {
    setTransactionId(id);
    categoryInputChangeHandler('');
    typeInputChangeHandler('');
    amountInputChangeHandler('');
    descInputChangeHandler('');
  };

  const {
    loading: submitting,
    error,
    sendHttpRequest: submitTransaction
  } = useHttp();

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
      validator: (value: string) =>
        enteredType === 'partial' ? validators.required(value) : true
    },
    {
      validator: (value: string) => {
        const transaction = transactions.find((t) => t.id === transactionId);
        return enteredType === 'partial'
          ? validators.max(transaction!.amount)(value)
          : true;
      }
    }
  ]);

  const {
    value: enteredType,
    valid: enteredTypeIsValid,
    onChange: typeInputChangeHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const {
    value: enteredDesc,
    valid: enteredDescIsValid,
    onChange: descInputChangeHandler,
    onBlur: descInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  let amountErrorTip = resolveErrorMessage(enteredAmountHasError)(
    'Please enter a valid amount'
  );

  let formIsValid =
    enteredCategoryIsValid &&
    enteredTypeIsValid &&
    enteredAmountIsValid &&
    enteredDescIsValid;

  const submitHandler = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const [category] = staticDataCacheMap
      .get('categories')!
      .filter((category) => category.id === +enteredCategory) as Category[];

    const transaction = transactions.find((t) => t.id === transactionId);

    const formData = new FormData();
    formData.append('source', 'PLAID');
    formData.append('categoryId', enteredCategory);
    formData.append('categoryName', category.categoryName);
    formData.append('merchantName', transaction!.merchantName);
    formData.append(
      'amount',
      enteredType === 'full' ? transaction!.amount + '' : enteredAmount
    );
    formData.append('description', enteredDesc);
    formData.append('trnxRefId', transaction!.transactionRefId + '');

    formData.append('customerId', String(userId));

    submitTransaction(
      process.env.REACT_APP_API_BASE_URL +
        'employee/dashboard/reembursement/pending',
      {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data'
        },
        body: formData
      },
      (response: HttpResponse<unknown>) => {
        const transactionsData = [...transactions];
        const transactionIndex = transactionsData.findIndex(
          (t) => t.id === transactionId
        );

        if (transactionIndex > -1) {
          transactionsData.splice(transactionIndex, 1);
          setTransactions(transactionsData);
        }
        setTransactionId(null);
        pushNotification({
          message:
            "Transaction submitted successfully. We'll be in touch on the status.",
          type: 'success',
          duration: 7000
        });
      }
    );
  };

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
        maxWidth={transactionId ? 'lg' : 'md'}
        fullWidth>
        <Typography
          variant="body1"
          fontSize="16px"
          fontFamily="Area-Normal-Black"
          color="primary.main">
          Transactions
        </Typography>
        <Typography variant="body2" gutterBottom mb="30px">
          Please note, we only reimburse care related expenses
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={transactionId ? 8 : 12}>
            <MHDataTable
              rows={transactions}
              columns={columns}
              frontEndPagination
              containerStyles={{
                borderWidth: 0,
                borderRadius: 0
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
              xs={4}
              position="sticky"
              height="90%"
              sx={{
                top: 0
              }}>
              <Box component={'form'} onSubmit={submitHandler}>
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
                />

                <MHButton type="submit" loading={submitting} fullWidth>
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
