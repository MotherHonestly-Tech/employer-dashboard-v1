import React from "react";

import Box from "@mui/material/Box";

import MHTextInput from "../Form/MHTextInput";
import MHButton from "../Button/MHButton";
import InputAdornment from "./InputAdornment";
import IconButtonUnstyled from "../Button/IconButtonStyled";
import useInput from "../../hooks/use-input";

import { ReactComponent as FilterIcon } from "../../static/svg/filter.svg";
import * as validators from "../../utils/validators";

const SearchField = ({
  icon,
  placeholder,
  bgcolor
}: {
  icon?: React.ReactElement;
  placeholder: string;
  bgcolor?: string;
}) => {
  const {
    value: searchValue,
    valid: searchValid,
    onChange: searchOnChange,
    onBlur: searchOnBlur,
  } = useInput([
    {
      validator: (value: string) => validators.required(value),
    },
  ]);

  return (
    <Box
      component={'form'}
      width={250}
      display="flex"
      bgcolor={bgcolor || '#F1F1F1'}>
      <MHTextInput
        id="search-interest"
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={searchOnChange}
        onBlur={searchOnBlur}
        className="flex-grow"
        endAdornment={
          <InputAdornment>
            <IconButtonUnstyled onClick={() => {}}>
              <FilterIcon />
            </IconButtonUnstyled>
          </InputAdornment>
        }
      />
      <MHButton
        sx={{
          minWidth: "auto",
          "& svg": {
            stroke: "grey.500",
            width: "1rem",
          },
          '&.MuiButton-root:hover svg': {
            stroke: 'primary'
          }
        }}>
        {icon && icon}
      </MHButton>
    </Box>
  );
};

export default SearchField;
