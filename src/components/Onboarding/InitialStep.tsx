import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { SelectOption } from '@mui/base';

import MHFormControl from '../Form/MHFormControl';
import { MHSelect } from '../Form/MHSelect';
import MHButton from '../../components/Button/MHButton';
import useInput from '../../hooks/use-input';

import * as validators from '../../utils/validators';
import * as constants from '../../utils/constants';
import OnboardingContext, {
  EmployeeOnboarding
} from '../../store/context/onboarding-context';

const InitialStep = React.forwardRef(
  (props: { activeIndex: number; onNext: () => void }, ref) => {
    const onboardingCtx = React.useContext(OnboardingContext);

    const {
      value: enteredFirstName,
      valid: enteredFirstNameIsValid,
      error: enteredFirstNameHasError,
      onChange: firstNameInputChangeHandler,
      onBlur: firstNameInputBlurHandler,
      markAsTouched: markFirstNameInputAsTouched
    } = useInput([
      {
        validator: (value: string) => validators.required(value)
      }
    ]);

    const {
      value: enteredLastName,
      valid: enteredLastNameIsValid,
      error: enteredLastNameHasError,
      onChange: lastNameInputChangeHandler,
      onBlur: lastNameInputBlurHandler,
      markAsTouched: markLastNameInputAsTouched
    } = useInput([
      {
        validator: (value: string) => validators.required(value)
      }
    ]);

    const {
      value: enteredState,
      valid: enteredStateIsValid,
      error: enteredStateHasError,
      onChange: stateInputChangeHandler,
      onBlur: stateInputBlurHandler,
      markAsTouched: markStateInputAsTouched
    } = useInput([
      {
        validator: (value: string) => validators.required(value)
      }
    ]);

    const {
      value: enteredZipCode,
      valid: enteredZipCodeIsValid,
      error: enteredZipCodeHasError,
      onChange: zipCodeInputChangeHandler,
      onBlur: zipCodeInputBlurHandler,
      markAsTouched: markZipCodeInputAsTouched
    } = useInput([
      {
        validator: (value: string) => validators.required(value)
      }
    ]);

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

    const {
      value: enteredHouseholdSize,
      valid: enteredHouseholdSizeIsValid,
      error: enteredHouseholdSizeHasError,
      onChange: householdSizeInputChangeHandler,
      onBlur: householdSizeInputBlurHandler,
      markAsTouched: markHouseholdSizeInputAsTouched
    } = useInput([
      {
        validator: (value: string) => validators.required(value)
      }
    ]);

    const {
      value: enteredNumberOfKids,
      valid: enteredNumberOfKidsIsValid,
      error: enteredNumberOfKidsHasError,
      onChange: numberOfKidsInputChangeHandler,
      onBlur: numberOfKidsInputBlurHandler,
      markAsTouched: markNumberOfKidsInputAsTouched
    } = useInput([
      {
        validator: (value: string) => {
          if (+enteredHouseholdSize < 3) {
            return true;
          }

          return validators.required(value);
        }
      }
    ]);

    let formIsValid =
      enteredFirstNameIsValid &&
      enteredLastNameIsValid &&
      enteredStateIsValid &&
      enteredZipCodeIsValid &&
      enteredStatusIsValid &&
      enteredHouseholdSizeIsValid &&
      enteredNumberOfKidsIsValid;

    const { states, employee, updateEmployee } = onboardingCtx;
    const { activeIndex, onNext } = props;

    // to set the values of the form when component is mounted
    React.useEffect(() => {
      if (!employee) return;

      firstNameInputChangeHandler(employee.firstName || '');
      lastNameInputChangeHandler(employee.lastName || '');
      stateInputChangeHandler(employee.state || '');
      zipCodeInputChangeHandler(employee.zipCode || '');
      statusInputChangeHandler(employee.relationshipStatus || '');
      householdSizeInputChangeHandler(employee.householdSize || '');
      numberOfKidsInputChangeHandler(employee.numberOfKids || '');
    }, []);

    function renderKidsSelectValue(option: SelectOption<string> | null) {
      if (!option) {
        return null;
      }

      return <span>{option?.value + ' kid(s)'}</span>;
    }

    function renderParentsSelectValue(option: SelectOption<string> | null) {
      let content = null;

      if (!option) {
        return content;
      }

      switch (option.value) {
        case 'yes':
          content = <span>{option.label} (I have living parents)</span>;
          break;
        case 'no':
          content = <span>{option.label} (I have no living parents)</span>;
          break;
        default:
          content = null;
          break;
      }

      return content;
    }

    let firstNameErrorTip =  enteredFirstNameHasError
      ? 'Please enter your first name'
      : undefined;

    let lastNameErrorTip = enteredLastNameHasError
      ? 'Please enter your last name'
      : undefined;

    let stateErrorTip = enteredStateHasError
      ? 'Please select your state of residence'
      : undefined;

    let zipCodeErrorTip = enteredZipCodeHasError
      ? 'Please enter your zip code'
      : undefined;

    let statusErrorTip = enteredStatusHasError
      ? 'Please select a value'
      : undefined;

    let householdSizeErrorTip = enteredHouseholdSizeHasError
      ? 'Please enter number of people in household'
      : undefined;

    let numberOfKidsErrorTip = enteredNumberOfKidsHasError
      ? 'Please select a value'
      : undefined;

    const preventDefault = (e: React.SyntheticEvent) => {
      e.preventDefault();
    };

    function submitHandler(e: React.ChangeEvent<HTMLFormElement>) {
      preventDefault(e);

      if (!formIsValid) {
        markFirstNameInputAsTouched();
        markLastNameInputAsTouched();
        markStateInputAsTouched();
        markZipCodeInputAsTouched();
        markStatusInputAsTouched();
        markHouseholdSizeInputAsTouched();
        markNumberOfKidsInputAsTouched();
        return;
      }

      updateEmployee({
        firstName: enteredFirstName,
        lastName: enteredLastName,
        state: enteredState,
        zipCode: enteredZipCode,
        relationshipStatus: enteredStatus,
        householdSize: enteredHouseholdSize,
        numberOfKids: enteredNumberOfKids,
      });
      onNext();
    }

    React.useImperativeHandle(ref, () => ({}));

    return (
      <React.Fragment>
        <Box component={'form'} onSubmit={submitHandler}>
          <MHFormControl
            id="firstName"
            type="text"
            label="First Name"
            placeholder="First Name"
            value={enteredFirstName}
            onChange={firstNameInputChangeHandler}
            onBlur={firstNameInputBlurHandler}
            error={firstNameErrorTip}
          />

          <MHFormControl
            id="lastName"
            type="text"
            label="Last Name"
            placeholder="Last Name"
            value={enteredLastName}
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
            error={lastNameErrorTip}
          />

          <MHSelect
            label="State"
            placeholder="Select State"
            options={states}
            value={enteredState}
            onChange={(val) => stateInputChangeHandler(val as string)}
            onBlur={stateInputBlurHandler}
            error={stateErrorTip}
          />

          <MHFormControl
            id="zipCode"
            type="text"
            label="Zip Code"
            placeholder="Zip Code"
            value={enteredZipCode}
            onChange={zipCodeInputChangeHandler}
            onBlur={zipCodeInputBlurHandler}
            error={zipCodeErrorTip}
          />

          <MHSelect
            label="Relationship"
            options={constants.RELATIONSHIP_STATUS_OPTIONS}
            placeholder="Relationship"
            value={enteredStatus}
            onChange={(val) => statusInputChangeHandler(val as string)}
            onBlur={statusInputBlurHandler}
            error={statusErrorTip}
          />

          <Grid container spacing={2}>
            <Grid
              item
              xs={6}
              sx={{
                transition: 'all 0.3s ease-in-out'
              }}>
              <MHFormControl
                id="householdSize"
                type="number"
                label="Household Size"
                placeholder="Household Size"
                value={enteredHouseholdSize}
                onChange={(event) => {
                  numberOfKidsInputChangeHandler('');
                  householdSizeInputChangeHandler(event);
                }}
                onBlur={householdSizeInputBlurHandler}
                error={householdSizeErrorTip}
              />
            </Grid>
            {+enteredHouseholdSize > 2 && (
              <Grid
                item
                xs={6}
                sx={{
                  transition: 'all 0.3s ease-in-out'
                }}>
                <MHSelect
                  label="Number of Kids"
                  options={constants.QUANTITY_OPTIONS}
                  placeholder="Number of Kids"
                  value={enteredNumberOfKids}
                  onChange={(val) =>
                    numberOfKidsInputChangeHandler(val as string)
                  }
                  onBlur={numberOfKidsInputBlurHandler}
                  renderValue={renderKidsSelectValue}
                  error={numberOfKidsErrorTip}
                />
              </Grid>
            )}
          </Grid>

          <Stack spacing={2} mt={3}>
            <MHButton type="submit">{'Next'}</MHButton>
          </Stack>
        </Box>
      </React.Fragment>
    );
  }
);

export default InitialStep;

// // to update employee context data when form is submitted
// React.useEffect(() => {

// }, [activeIndex, updateEmployee, employeeOnboarding, formIsValid]);
// if form is valid, call the submit handler passed in props
// pass down activeIndex from parent and when it changes in useeffect, update ctx
// call function in useeffect cleanup to update ctx when component is destroyed/unmounted
