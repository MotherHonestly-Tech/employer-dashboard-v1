import React from 'react';
import MHDialog from '../Dialog/MHDialog';
import Invoice from './Invoice';

const InvoiceDialog = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <MHDialog
      open={open}
      title="Invoice"
      handleClose={onClose}
      maxWidth="md"
      actions={null}
      scroll="paper">
      <Invoice />
    </MHDialog>
  );
};

export default InvoiceDialog;
