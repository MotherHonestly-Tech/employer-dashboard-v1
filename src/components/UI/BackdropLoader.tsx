import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from '@mui/material/Backdrop';
import { ReactComponent as PrimaryIcon } from '../../static/svg/primary-icon.svg';

const BackdropLoader = () => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop
          sx={{
            color: (theme) => theme.palette.common.white,
            backgroundColor: (theme) => theme.palette.common.white,
            opacity: 0.95,
            zIndex: (theme) => theme.zIndex.drawer + 1
          }}
          open={true}>
          <div className="loading-icon-container">
            <div className="loading-icon overshot"></div>
          </div>
          <div
            style={{ position: 'absolute' }}>
            <PrimaryIcon />
          </div>
          {/* <CircularProgress
            color="primary"
            thickness={4.2}
            aria-describedby="loading"
            sx={{
              opacity: 0.5
            }}
          /> */}
        </Backdrop>,
        document.getElementById('backdrop-root') as HTMLElement
      )}
    </React.Fragment>
  );
};

export default BackdropLoader;
