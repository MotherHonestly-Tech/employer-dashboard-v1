import React from 'react';

import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';

const Overlay = styled('div')(
  ({ theme }) => `
  .loader-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${theme.palette.primary.main};
    backdrop-filter: blur(10px);
    z-index: 100;
  }
`
);

const LoaderStyled = styled('div')(
  ({ theme }) => `
    border: 3px solid transparent;
    border-radius: 50%;
    border-top: 3px solid ${theme.palette.primary.main};
    width: 28px;
    height: 28px;
    animation: spin 1s linear infinite;
    opacity: 0.5;
    margin-right: 10px;
    
    @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
    }`
);

const LoadingIndicator = () => {
  return (
    <React.Fragment>
      {/* <CircularProgress
        color="primary"
        size={25}
        thickness={4.2}
        aria-describedby="loading"
        sx={{
          opacity: 0.5,
          mr: 1.5
        }}
      /> */}
      <LoaderStyled />
      <Typography variant="body1">Loading...</Typography>
    </React.Fragment>
  );
};

export default LoadingIndicator;
// <div className="backdrop-filter backdrop-blur h-full w-full fixed top-0 left-0 z-50">
//   <div className="loader-wrapper">
//     <div className="loader"></div>
//     <p className="font-semibold">Loading...</p>
//   </div>
// </div>
