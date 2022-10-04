import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ReactComponent as SortIcon } from '../../static/svg/chevron-down.svg';
import { ReactComponent as ArrowRightIcon } from '../../static/svg/arrow-right-thick.svg';
import MHButton from '../Button/MHButton';
import MHTextInput from '../Form/MHTextInput';
import SearchField from '../Form/SearchField';

const SearchFilter = () => {
  return (
    <React.Fragment>
      <Box className="bg-white h-12 flex items-center px-2 relative" borderTop={1} borderBottom={1} borderColor="#E2E2E2">
        <Typography
          color="primary"
          className="uppercase p-4"
          sx={{
            fontWeight: 900,
            fontSize: '12px',
            fontFamily: 'Area-Extended'
          }}>
          Filter By
        </Typography>

        <Typography
          color="primary"
          className="capitalize p-4 flex font-areaSemi text-[12px]">
          Category
          <SortIcon className="mt-[2px] ml-1" height="10px" width="10px" />
        </Typography>

        <Typography
          color="primary"
          className="capitalize p-4 flex font-areaSemi text-[12px]">
          Expertise
          <SortIcon className="mt-[2px] ml-1" height="10px" width="10px" />
        </Typography>

        {/* <Box
          component={'form'}
          height={30}
          width={250}
          display="flex"
          className="my-2 ml-16 shadow-sm">
          <MHTextInput
            id="search-interest"
            type="text"
            placeholder="Search coach"
            className="flex-grow text-[12px] shadow-inner"
          />
          <MHButton
            sx={{
              minWidth: 'auto',
              '& svg': {
                stroke: 'grey.500',
                width: '1rem'
              },
              '&.MuiButton-root:hover svg': {
                stroke: 'primary'
              }
            }}>
            <ArrowRightIcon />
          </MHButton>
        </Box> */}
        
        <SearchField
          icon={<ArrowRightIcon width="1rem" />}
          placeholder="Search Coach"
          bgcolor="#FFFFFF"
          sx={{
            ml: 8,
            height: '85%'
          }}
        />

        <Box className="absolute right-1 flex">
          <Typography
            color="primary"
            className="capitalize p-4 flex opacity-50  text-[12px] font-areaSemi">
            10 Results
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default SearchFilter;
