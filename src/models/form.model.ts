import React from 'react';
import { SelectOption } from '@mui/base';

export type Form = {
  [key: string]: FormControl | boolean;
};

type FormControl = {
  value: string;
  valid: boolean;
  required: boolean;
  validating: boolean;
  validators: Validator[];
};

export type Validator = {
  validator: (value: string) => boolean;
};

export interface SelectProps<T> {
  options: SelectOption<T>[];
  optionRenderer?: (option: SelectOption<T>) => React.ReactNode;
  placeholder?: string;
  label?: string;
  value: T;
  onChange: (val: T | null) => void;
  onBlur: () => void;
  renderValue?: (option: SelectOption<T> | null) => React.ReactNode;
  popperWidth?: string;
  error?: string;
}

export interface MultiSelectProps<T> {
  options: SelectOption<T>[];
  placeholder?: string;
  label?: string;
  value: T[];
  onChange: (val: T[] | null) => void;
  onBlur: () => void;
  renderValue?: (options: SelectOption<T>[] | null) => React.ReactNode;
  popperWidth?: string;
}

// type  = {
//   placeholder?: string;
//   options: {
//     value: string;
//     label: string;
//     [key: string]: any;
//   }[];
