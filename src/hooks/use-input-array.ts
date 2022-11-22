import React from 'react';

import { Validator } from '../models/form.model';

type InputField = {
  value: string;
  error: boolean;
  touched: boolean;
  valid: boolean;
};

const useInputArray = (validators: Validator[]) => {
  const [inputFields, setInputFields] = React.useState<InputField[]>([]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement> | string,
    index: number
  ) => {
    setInputFields((fields) => {
      const copiedFields = [...fields];
      const value = typeof e === 'string' ? e : e.target.value;

      const validatorsResults = validators.map((validator) =>
        validator.validator(value)
      );
      const isValid = validatorsResults.reduce(
        (acc, curr) => acc && curr,
        true
      );

      copiedFields[index] = {
        ...copiedFields[index],
        value: value,
        touched: true,
        error: !isValid,
        valid: isValid
      };

      return copiedFields;
    });
  };

  const addField = React.useCallback(() => {
    setInputFields((fields) => {
      const inputField: InputField = {
        value: '',
        touched: false,
        valid: false,
        error: false
      };

      fields = fields.concat(inputField);
      return fields;
    });
  }, []);

  const removeField = (index: number) => {
    setInputFields((fields) => {
      const modifiedFields = fields.filter((field, i) => index !== i);
      return modifiedFields;
    });
  };

  return {
    inputFields,
    onChange,
    addField,
    removeField
  };
};

export default useInputArray;
