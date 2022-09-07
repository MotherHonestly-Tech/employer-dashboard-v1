import React from 'react';

import MHDialog from '../Dialog/MHDialog'

const Transactions = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
    
  return (
    <React.Fragment>
      <MHDialog
        open={open}
        title={''}
        handleClose={onClose}
        scroll="paper"
        actions={null}>


        </MHDialog>
    </React.Fragment>
  )
}

export default Transactions