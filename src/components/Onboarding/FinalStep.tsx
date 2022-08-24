import React from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { SelectOption } from '@mui/base';

import MHFormControl from '../Form/MHFormControl';
import MHButton from '../Button/MHButton';
import { MHMultiSelect } from '../Form/MHSelect';
import useInput from '../../hooks/use-input';

import * as validators from '../../utils/validators';
import OnboardingContext from '../../store/context/onboarding-context';

const SelectTag = styled('span')(
  ({ theme }) => `
  border-radius: 3px;
  background: #EBE5F1;
  padding: 4px 9px;
  display: inline-block;
  color: ${theme.palette.primary.main};
`
);

const FinalStep = (props: {
  activeIndex: number;
  onNext: () => void;
  onPrevious: (e: React.MouseEvent) => void;
}) => {
  const onboardingCtx = React.useContext(OnboardingContext);

  const {
    value: enteredJobTitle,
    valid: enteredJobTitleIsValid,
    error: enteredJobTitleHasError,
    onChange: jobTitleInputChangeHandler,
    onBlur: jobTitleInputBlurHandler,
    markAsTouched: markJobTitleInputAsTouched
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const {
    value: enteredPosition,
    valid: enteredPositionIsValid,
    error: enteredPositionHasError,
    onChange: positionInputChangeHandler,
    onBlur: positionInputBlurHandler,
    markAsTouched: markPositionInputAsTouched
  } = useInput([{ validator: (value: string) => validators.required(value) }]);

  const {
    value: enteredDepartment,
    valid: enteredDepartmentIsValid,
    error: enteredDepartmentHasError,
    onChange: departmentInputChangeHandler,
    onBlur: departmentInputBlurHandler,
    markAsTouched: markDepartmentInputAsTouched
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const [careResponsibilites, setCareResponsibilites] = React.useState<
    string[] | null
  >([]);

  const careResInputChangeHandler = (values: string[] | null) => {
    setCareResponsibilites(values);
  };

  let formIsValid =
    enteredJobTitleIsValid &&
    enteredPositionIsValid &&
    enteredDepartmentIsValid;
  // &&
  // careResponsibilites?.length;

  const { employee, updateEmployee } = onboardingCtx;
  const { activeIndex, onNext, onPrevious } = props;

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!employee) return;

    jobTitleInputChangeHandler(employee.jobTitle || '');
    positionInputChangeHandler(employee.position || '');
    departmentInputChangeHandler(employee.department || '');
    // careResInputChangeHandler(employee.careResponsibilities || []);
  }, []);

  function updateEmployeeData() {
    updateEmployee({
      jobTitle: enteredJobTitle,
      position: enteredPosition,
      department: enteredDepartment
      // careResponsibilities: careResponsibilites as Array<string>
    });
  }

  function renderValue(options: SelectOption<string>[] | null) {
    let content = null;

    if (!options) return content;

    return (
      <Stack
        direction="row"
        spacing={1}
        maxWidth="320px"
        overflow={'auto'}
        sx={{
          whiteSpace: 'nowrap',
          '::-webkit-scrollbar': {
            height: '0px'
          }
        }}>
        {options.map((item) => (
          <SelectTag key={item.value}>{item.label}</SelectTag>
        ))}
      </Stack>
    );
  }

  let jobTitleErrorTip = enteredJobTitleHasError
    ? 'Please enter your job title'
    : undefined;

  let positionErrorTip = enteredPositionHasError
    ? 'Please enter your position'
    : undefined;

  let departmentErrorTip = enteredDepartmentHasError
    ? 'Please enter your department'
    : undefined;

  function submitHandler(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formIsValid) {
      markJobTitleInputAsTouched();
      markPositionInputAsTouched();
      markDepartmentInputAsTouched();
      return;
    }

    updateEmployeeData();
    onNext();
  }

  function previousStepHandler(e: React.MouseEvent) {
    e.preventDefault();

    updateEmployeeData();
    onPrevious(e);
  }

  return (
    <React.Fragment>
      <Box component={'form'} onSubmit={submitHandler}>
        <MHFormControl
          id="jobTitle"
          type="text"
          label="Job Title"
          placeholder="Tell us your role in the company"
          value={enteredJobTitle}
          onChange={jobTitleInputChangeHandler}
          onBlur={jobTitleInputBlurHandler}
          error={jobTitleErrorTip}
        />

        <MHFormControl
          id="position"
          type="text"
          label="Level/Position"
          placeholder="What position do you hold in the company?"
          value={enteredPosition}
          onChange={positionInputChangeHandler}
          onBlur={positionInputBlurHandler}
          error={positionErrorTip}
        />

        <MHFormControl
          id="department"
          type="text"
          label="Department"
          placeholder="What department do you work in?"
          value={enteredDepartment}
          onChange={departmentInputChangeHandler}
          onBlur={departmentInputBlurHandler}
          error={departmentErrorTip}
        />

        {/* <MHMultiSelect
          label="Care Responsibilities"
          placeholder="What are your care responsibilities?"
          options={constants.CARE_RESPONSIBILITY_OPTIONS}
          value={careResponsibilites as string[]}
          onChange={careResInputChangeHandler}
          onBlur={() => {}}
          renderValue={renderValue}
        /> */}

        <Stack spacing={2} mt={3}>
          <MHButton type="submit">{'Complete'}</MHButton>

          <MHButton
            type="button"
            variant="outlined"
            onClick={previousStepHandler}>
            Previous
          </MHButton>
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default FinalStep;
