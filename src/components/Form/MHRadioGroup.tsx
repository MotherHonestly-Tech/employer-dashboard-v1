import React from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import Label from '../Form/Label';

type RadioButtonProps = {
  label?: string;
  id: string;
  name: string;
  options: { value: string; label: string }[];
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | undefined;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: any) => void;
};

const MHRadioGroup = ({
  label,
  id,
  name,
  color,
  options,
  value,
  onChange
}: RadioButtonProps) => {
  return (
    <FormControl>
      {label && <Label id={id}>{label}</Label>}
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        name={name}
        value={value}
        onChange={onChange}
        sx={{
          mb: 2
        }}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            label={option.label}
            control={
              <Radio
                color={color || 'secondary'}
                sx={{
                  p: 0.5
                }}
              />
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default MHRadioGroup;
