import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import RoundedLogoIcon from '../../theme/icons/RoundedLogo';
import EmployeeStat, {
  EmployeeStatProps
} from '../../components/EmployerInsights/EmployeeStat';
import MHFormControl from '../../components/Form/MHFormControl';
import InputAdornment from '../../components/Form/InputAdornment';
import Label from '../../components/Form/Label';
import AllocationPerPeriod from '../../components/Wallet/AllocationPerPeriod';
import StackedContainer from '../../components/Wallet/StackedContainerStyled';
import MHRadioGroup from '../../components/Form/MHRadioGroup';
import AllocationSummary from '../../components/Wallet/AllocationSummary';
import BillingPeriod from '../../components/Wallet/BillingPeriod';
import MHButton from '../../components/Button/MHButton';
import InvoiceDialog from '../../components/Wallet/InvoiceDialog';
import useInput from '../../hooks/use-input';
import useInputArray from '../../hooks/use-input-array';
import useHttp from '../../hooks/use-http';

import { ReactComponent as UsersGroupIcon } from '../../static/svg/users-group.svg';
import { ReactComponent as DollarIcon } from '../../static/svg/dollar.svg';
import { parseAmount, resolveErrorMessage } from '../../utils/utils';
import { ALLOCATION_FIELDS } from '../../utils/constants';
import * as validators from '../../utils/validators';
import { HttpResponse } from '../../models/api.interface';
import { Category } from '../../models/wallet.model';
import DashboardContext from '../../store/context/dashboard.context';

type AllocationPeriod = 'monthly' | 'quarterly';

const PERIOD_OPTIONS = [
  {
    value: 'monthly',
    label: 'Monthly'
  },
  {
    value: 'quarterly',
    label: 'Quarterly'
  }
];

const Allocation = () => {
  const [monthlyAllocation, setMonthlyAllocation] = React.useState(0);
  const [quarterlyAllocation, setQuarterlyAllocation] = React.useState(0);

  const dashboardCtx = React.useContext(DashboardContext);
  const { staticDataCacheMap: dataCacheMap, organization } = dashboardCtx;

  const { loading, error, sendHttpRequest } = useHttp();

  const EMPLOYEE_STAT: EmployeeStatProps = {
    theme: 'dark',
    icon: (
      <RoundedLogoIcon sx={{ p: 0.6, mb: 2 }}>
        <UsersGroupIcon />
      </RoundedLogoIcon>
    ),
    title: 'No of Employees',
    stat: 116
  };

  const {
    value: enteredAllocation,
    valid: enteredAllocationIsValid,
    error: enteredAllocationHasError,
    onChange: allocationInputChangeHandler,
    onBlur: allocationInputBlurHandler,
    markAsTouched: markAllocationInputAsTouched
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const { inputFields, onChange, addField, removeField } = useInputArray([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const [allocationDuration, setAllocationDuration] = React.useState<
    AllocationPeriod
  >('quarterly');

  const [allocationBuckets, setAllocationBuckets] = React.useState<
    readonly Category[]
  >(dataCacheMap.get('categories') ? dataCacheMap.get('categories')! : []);

  const allocationDurationChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAllocationDuration(e.target.value as AllocationPeriod);
  };

  let SUB_ALLOCATION_BUCKETS = React.useRef(
    allocationBuckets.filter((category) => !isCategoryAnythingBucket(category))
  );

  React.useEffect(() => {
    if (dataCacheMap.get('categories')) {
      setAllocationBuckets(dataCacheMap.get('categories')!);

      SUB_ALLOCATION_BUCKETS.current = allocationBuckets.filter(
        (category) => !isCategoryAnythingBucket(category)
      );
    }

    SUB_ALLOCATION_BUCKETS.current.forEach((field) => {
      addField();
    });
  }, [dataCacheMap, addField]);

    
  // React.useEffect(() => {
  //   console.log(dashboardCtx);
  // }, [dashboardCtx]);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function isCategoryAnythingBucket(category: Category): boolean {
    if (!category || !category.categoryName) {
      return false;
    } else if (category.categoryName.toLowerCase().trim() === 'anything') {
      return true;
    }
    return false;
  }

  const computeAllocation = () => {
    const employeePopulation = 160;

    setAllocationBuckets((buckets) => {
      const modifiedSubBuckets = SUB_ALLOCATION_BUCKETS.current.map((bucket, i) => ({
        ...bucket,
        allocation: inputFields.length ? +parseAmount(inputFields[i].value) : 0
      }));

      let [anythingBucket] = buckets.filter((bucket) =>
        isCategoryAnythingBucket(bucket)
      );
      anythingBucket = {
        ...anythingBucket,
        allocation: +parseAmount(enteredAllocation)
      };

      return [...[anythingBucket], ...modifiedSubBuckets];
    });

    const totalAmount =
      inputFields.reduce(
        (prev, current, index) => prev + +parseAmount(current.value),
        0
      ) + +parseAmount(enteredAllocation);

    const allocationPerMonth = employeePopulation * totalAmount;
    setMonthlyAllocation(allocationPerMonth);
    setQuarterlyAllocation(allocationPerMonth * 3);
  };

  const submitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendHttpRequest(
      process.env.REACT_APP_API_BASE_URL + 'employer/dashboard/employer',
      {
        method: 'PUT',
        body: JSON.stringify({
          employerRefId: organization?.employer.employerRefId,
          allocationList: allocationBuckets.map(bucket => ({
            catReferenceId: bucket.catReferenceId,
            categoryName: bucket.categoryName,
            allocationAmount: bucket.allocation
          }))
        })
      },
      (response: HttpResponse<unknown>) => {
        handleOpen();
      }
    );
  };

  return (
    <React.Fragment>
      <Box mb={4} position="relative">
        <Typography variant="h1" paragraph>
          Wallet
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={5}>
          <Grid container spacing={2} mb={4}>
            <Grid
              item
              xs={8}
              //   onClick={handleOpen}
              sx={{
                cursor: 'pointer'
              }}>
              <EmployeeStat
                {...EMPLOYEE_STAT}
                containerSx={{
                  py: 2,
                  minHeight: 70,
                  width: '100%'
                }}
              />
            </Grid>
          </Grid>

          <Paper
            sx={{
              py: 4,
              px: 3,
              borderRadius: 4
            }}>
            <Box component="form" id="allocation-form" onSubmit={submitHandler}>
              <MHFormControl
                id="allocation"
                type="number"
                label={'Monthly stipend Per Employee ($)'}
                placeholder="Amount ($)"
                value={enteredAllocation}
                onChange={allocationInputChangeHandler}
                onBlur={() => {
                  allocationInputBlurHandler();
                  computeAllocation();
                }}
                precision={2}
                startAdornment={
                  <InputAdornment>
                    <DollarIcon width="1rem" />
                  </InputAdornment>
                }
                autoComplete="off"
                error={resolveErrorMessage(enteredAllocationHasError)(
                  'Please enter your allocation per employee'
                )}
              />

              {inputFields.map((field, i) => (
                <Stack
                  key={i}
                  direction="row"
                  alignItems="center"
                  //   justifyContent="space-between"
                  sx={{
                    '& > div, & > label': {
                      flexGrow: 1
                    }
                  }}>
                  <Label
                    sx={{
                      width: '50%',
                      minWidth: 0
                    }}>
                    {ALLOCATION_FIELDS[i]}
                  </Label>
                  <MHFormControl
                    id={'allocation-bucket' + i}
                    type="number"
                    placeholder="Amount ($)"
                    value={field.value}
                    onChange={(e) => onChange(e, i)}
                    onBlur={computeAllocation}
                    precision={2}
                    startAdornment={
                      <InputAdornment>
                        <DollarIcon width="1rem" />
                      </InputAdornment>
                    }
                    autoComplete="off"
                  />
                </Stack>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={7}>
          <AllocationPerPeriod
            monthlyAllocation={monthlyAllocation}
            quarterlyAllocation={quarterlyAllocation}
          />

          <StackedContainer
            direction="column"
            alignItems="flex-start"
            py={1.5}
            px={3}
            mb={2}>
            <Typography variant="subtitle2" fontSize=".8rem">
              Payment Duration
            </Typography>

            <MHRadioGroup
              row
              name="allocation-period"
              id="allocation-period"
              options={PERIOD_OPTIONS}
              value={allocationDuration}
              onChange={allocationDurationChangeHandler}
              color="default"
              controlSx={{
                mb: 0
              }}
            />
          </StackedContainer>

          <AllocationSummary allocationFields={allocationBuckets} />

          <BillingPeriod />

          <MHButton
            type="submit"
            form="allocation-form"
            loading={loading}
            sx={{
              mt: 2
            }}
            fullWidth>
            Generate Invoice
          </MHButton>
        </Grid>
      </Grid>

      <InvoiceDialog
        open={open}
        onClose={handleClose}
        allocationBuckets={allocationBuckets}
      />
    </React.Fragment>
  );
};

export default Allocation;
