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

import { ReactComponent as UsersGroupIcon } from '../../static/svg/users-group.svg';
import { ReactComponent as DollarIcon } from '../../static/svg/dollar.svg';
import * as validators from '../../utils/validators';
import { resolveErrorMessage } from '../../utils/utils';
import { ALLOCATION_FIELDS } from '../../utils/constants';

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
  >('monthly');

  const allocationDurationChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAllocationDuration(e.target.value as AllocationPeriod);
  };

  React.useEffect(() => {
    ALLOCATION_FIELDS.forEach((field) => {
      addField();
    });
  }, []);

  const computeAllocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    allocationInputChangeHandler(e);
    // computeAllocation(+parseAmount(e.target.value));
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleOpen();
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
                onChange={computeAllocation}
                onBlur={allocationInputBlurHandler}
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
          <AllocationPerPeriod />

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

          <AllocationSummary />

          <BillingPeriod />

          <MHButton
            type="submit"
            form="allocation-form"
            sx={{
              mt: 2
            }}
            fullWidth>
            Generate Invoice
          </MHButton>
        </Grid>
      </Grid>

      <InvoiceDialog open={open} onClose={handleClose} />
    </React.Fragment>
  );
};

export default Allocation;
