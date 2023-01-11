import React from 'react';
import { Category } from '../../models/wallet.model';
import MHDialog from '../Dialog/MHDialog';
import Invoice from './Invoice';

const InvoiceDialog = ({
  open,
  onClose,
  allocationBuckets
}: {
  open: boolean;
  onClose: () => void;
  allocationBuckets: readonly Category[]
}) => {
  return (
    <MHDialog
      open={open}
      title="Invoice"
      handleClose={onClose}
      maxWidth="md"
      actions={null}
      scroll="paper">
      <Invoice allocationBuckets={allocationBuckets} />
    </MHDialog>
  );
};

export default InvoiceDialog;
