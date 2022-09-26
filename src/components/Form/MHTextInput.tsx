import React from 'react';

import InputUnstyled, {
  InputUnstyledProps,
  inputUnstyledClasses
} from '@mui/base/InputUnstyled';
import { useFormControlUnstyledContext } from '@mui/base/FormControlUnstyled';
import { styled } from '@mui/system';
import { parseAmount } from '../../utils/utils';

const grey = {
  50: '#F3F6F9',
  100: '#EEEEEE',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027'
};

const StyledInputRoot = styled('div')(
  ({ theme }) => `
    display: flex;
    font-weight: 400;
    border: 1px solid ${grey[200]};
    align-items: center;
    justify-content: center;
    transition: all 0.4s ease-in;
    position: relative;
    
    .Mui-focused > &.MuiInput-root.MuiInput-formControl {
      border: 1px solid ${grey[500]};
    }

    &.MuiInput-root.Mui-focused {
      border: 1px solid ${grey[300]};
    }

    &.MuiInput-root:hover {
      border-color: ${grey[300]};
    }
  `
);

const StyledInputElement = styled('input')`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.5;
  flex-grow: 1;
  color: ${grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 12px 12px;
  outline: 0;
  box-sizing: border-box;
`;

const StyledTextareaElement = styled(
  React.forwardRef(
    ({ ...props }, ref: React.ForwardedRef<HTMLInputElement>) => (
      <textarea {...props} rows={4}></textarea>
    )
  ),
  {
    shouldForwardProp: (prop) =>
      !['ownerState', 'minRows', 'maxRows', 'rows'].includes(prop.toString())
  }
)(
  ({ theme }) => `
  display: block;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.5;
  flex-grow: 1;
  color: ${grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 12px 12px;
  outline: 0;
`
);

const MHTextInput = React.forwardRef(
  (props: InputUnstyledProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { components, rows, ...others } = props;

    // const formControlContext = useFormControlUnstyledContext();
    React.useEffect(() => {
      // console.log(inputRef);
    }, []);

    // const { onChange, onFocus, onBlur, error } = formControlContext!;

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      others.onChange && others.onChange(event);
    };

    const inputBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
      if (others.type === 'number' && event.target.value) {
        let formattedValue = parseFloat(parseAmount(event.target.value))
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,');
        event.target.value = formattedValue;
        others.onChange &&
          others.onChange(event as React.ChangeEvent<HTMLInputElement>);
      }
      others.onBlur && others.onBlur(event);
    };

    React.useImperativeHandle(ref, () => ({} as any));

    return (
      <React.Fragment>
        <InputUnstyled
          components={{
            Root: StyledInputRoot,
            Input: StyledInputElement,
            Textarea: StyledTextareaElement,
            ...components
          }}
          {...others}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
          ref={ref}
          componentsProps={{
            input: {
              type: others.type === 'number' ? 'text' : others.type
            }
          }}
        />
      </React.Fragment>
    );
  }
);

export default MHTextInput;
// event.target.value.replace(/[^0-9]/g, '');
// inputMode: 'decimal',
// pattern: '[0-9]*',
// precision: '2',
// step: '1.00'
