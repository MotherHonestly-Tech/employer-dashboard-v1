import React from 'react';

import Radio, { RadioProps, radioClasses } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { SxProps, Theme } from '@mui/material/styles'

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
  controlSx?: SxProps<Theme>
};

const MHRadio = (props: RadioProps) => {
  return (
    <Radio
      color={props.color || 'secondary'}
      sx={{
        p: 0.5,
        [`&.${radioClasses.root}`]: {
          color: '#dadad8'
        },
        [`&.${radioClasses.checked}`]: {
          color: theme => theme.palette.primary.main
        },
      }}
      {...props}
    />
  );
};

const MHRadioGroup = ({
  label,
  id,
  name,
  color,
  options,
  value,
  onChange,
  controlSx
}: RadioButtonProps) => {
  return (
    <FormControl fullWidth>
      {label && <Label id={id}>{label}</Label>}
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        name={name}
        value={value}
        onChange={onChange}
        sx={{
          mb: 2,
        }}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            label={option.label}
            control={<MHRadio color={color} />}
            sx={controlSx}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default MHRadioGroup;
