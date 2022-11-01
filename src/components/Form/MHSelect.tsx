import * as React from 'react';

import SelectUnstyled, {
  SelectUnstyledProps,
  selectUnstyledClasses
} from '@mui/base/SelectUnstyled';
import MultiSelectUnstyled, {
  MultiSelectUnstyledProps
} from '@mui/base/MultiSelectUnstyled';
import OptionUnstyled, {
  optionUnstyledClasses,
  OptionUnstyledProps
} from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
import { SelectOption } from '@mui/base';

import Label from './Label';
import { SelectProps, MultiSelectProps } from '../../models/form.model';
import ErrorTip from './ErrorTip';
import { theme } from '../../theme/mui/dashboard.theme';

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75'
};

const grey = {
  50: '#F3F6F9',
  100: '#E0E3E7',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027'
};

//   min-width: 320px;
//   border-radius: 0.75em;
const isExistingValue = (value: Array<string> | string) => {
  if (Array.isArray(value)) {
    return (value as Array<string>).some((v) => Boolean(v));
  } else {
    return Boolean(value);
  }
};

const StyledButton = styled('button')<{
  placeholder: string;
  renderValue: (
    option: SelectOption<string> | SelectOption<string>[]
  ) => React.ReactNode;
}>(
  ({ theme, placeholder, value }) => `
    font-family: Area-Normal-Semibold;
    font-size: 0.75rem;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    width: 100%;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${grey[100]};
    margin-bottom: 1.25rem;
    padding: 10px;
    text-align: left;
    line-height: 1.5;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    display: flex;
    align-items: center;
    overflow-x: hidden;
  
    &:before {
      content: '${isExistingValue(value as string) ? '' : placeholder || ''}';
      color: ${grey[500]};
      font-weight: 400;
      line-height: 1.5;
    }
  
    &:hover {
      border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[300]};
    }
  
    &.${selectUnstyledClasses.focusVisible} {
      outline: 3px solid ${
        theme.palette.mode === 'dark' ? blue[600] : blue[100]
      };
    }

    &::after {
      content: '';
      display: block;
      width: 12px;
      height: 12px;
      flex-grow: 1;
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDE0IDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNy41IDUuNUwxMyAxIiBzdHJva2U9IiMwMDk2ODgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K");
      background-repeat: no-repeat;
      background-position: right;
    }
  
    &.${selectUnstyledClasses.expanded} {
      &::after {
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        flex-grow: 1;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDE0IDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNy41IDUuNUwxMyAxIiBzdHJva2U9IiMwMDk2ODgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K");
        background-repeat: no-repeat;
        background-position: left;
        transform: rotate(180deg);
      }
      box-shadow: 0px 4px 5px 0px rgba(88, 88, 88, 0.14);
    }
    `
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: Area-Normal-Semibold;
  font-size: 0.75rem;
  box-sizing: border-box;
  padding: 5px;
  min-width: fit-content;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  max-height: 200px;
  box-shadow: 0px 4px 5px 0px rgba(88, 88, 88, 0.14);

  ::-webkit-scrollbar {
    width: 8px;
    border-radius: 15px;
  }
  
  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 15px;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: #C8C8C8;
    width: 8px;
    border-radius: 15px;
  }
  `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const Checkmark = styled('span')(
  ({ theme }) => `
    border: 1px solid black;
    border-radius: 3px;
    width: 12px;
    height: 12px;
    display: inline-block;

    .${optionUnstyledClasses.selected} &{
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNiIgaGVpZ2h0PSI0IiB2aWV3Qm94PSIwIDAgNiA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMSAxLjk5OTg0TDIuNSAzLjMzMzE3TDUgMC42NjY1MDQiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 8px 8px;
    }
`
);

const optionStyles = ({ theme }: any) => `
list-style: none;
padding: 8px;
border-radius: 0.45em;
cursor: default;

&:last-of-type {
  border-bottom: none;
}

&.${optionUnstyledClasses.selected} {
  background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
  color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
}

&.${optionUnstyledClasses.root} {
  background-color: transparent;
}

&.${optionUnstyledClasses.highlighted} {
  background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
}

&.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
  background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
  color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
}

&.${optionUnstyledClasses.disabled} {
  color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
}

&:hover:not(.${optionUnstyledClasses.disabled}) {
  background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
}
`;

const StyledMultiSelectOption = styled(
  (props: OptionUnstyledProps<unknown>) => {
    return (
      <OptionUnstyled {...props}>
        <Checkmark /> &nbsp; {props.children}
      </OptionUnstyled>
    );
  }
)(optionStyles);

const StyledOption = styled(OptionUnstyled)(optionStyles);

type ExtraProps = {
  value?: string | string[];
  placeholder?: string;
  onBlur?: () => void;
  popperWidth?: string;
  error?: string;
};

function CustomSelect<T extends {}>(props: SelectUnstyledProps<T> & ExtraProps) {
  const components: SelectUnstyledProps<T>['components'] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components
  };

  const { popperWidth, ...rest } = props;

  return (
    <SelectUnstyled
      {...rest}
      components={components}
      componentsProps={{
        root: {
          value: props.value,
          placeholder: props.placeholder || 'Select an option',
          onBlur: props.onBlur,
          style: {
            borderColor: props.error ? theme.palette.error.main : `${grey[100]}`
          }
        },
        popper: {
          style: {
            width: popperWidth || '320px'
          }
        }
      }}
    />
  );
}

// error={props.error}
export function MHSelect(props: SelectProps<string>) {
  return (
    <>
      {props.label && <Label>{props.label}</Label>}
      <CustomSelect
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        renderValue={props.renderValue}
        popperWidth={props.popperWidth}
       >
        {props.options.map((opt) => (
          <StyledOption key={opt.value} value={opt.value}>
            {props.optionRenderer ? props.optionRenderer(opt) : opt.label}
          </StyledOption>
        ))}
      </CustomSelect>
      {props.error && (
        <ErrorTip
          style={{
            position: 'relative',
            top: '-1rem'
          }}>
          {props.error}
        </ErrorTip>
      )}
    </>
  );
}

function CustomMultiSelect<TValue extends {}>(
  props: MultiSelectUnstyledProps<TValue> & ExtraProps
) {
  const components: MultiSelectUnstyledProps<TValue>['components'] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components
  };

  const { popperWidth, ...rest } = props;

  return (
    <MultiSelectUnstyled
      {...rest}
      components={components}
      componentsProps={{
        root: {
          value: props.value,
          placeholder: props.placeholder || 'Select an option',
          onBlur: props.onBlur
        },
        popper: {
          style: {
            width: popperWidth || '320px'
          }
        }
      }}
    />
  );
}

export function MHMultiSelect(props: MultiSelectProps<string>) {
  return (
    <>
      {props.label && <Label>{props.label}</Label>}
      <CustomMultiSelect
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        renderValue={props.renderValue}
        popperWidth={props.popperWidth}>
        {props.options.map((opt) => (
          <StyledMultiSelectOption key={opt.value} value={opt.value}>
            {opt.label}
          </StyledMultiSelectOption>
        ))}
      </CustomMultiSelect>
    </>
  );
}
