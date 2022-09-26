import React from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import MHButton from '../Button/MHButton';
import MHDialog from '../Dialog/MHDialog';

import { Expense } from '../../models/wallet.model';
import { formatAmount, formatDate } from '../../utils/utils';
import { RECEIPT_STATUS } from './ExpenseStatus';

type ExpenseProps = {
  open: boolean;
  onClose: () => void;
  expense: Expense | null;
};

const ExpenseDetail = function ({
  title,
  content
}: {
  title: string;
  content: string;
}) {
  return (
    <React.Fragment>
      <Typography
        variant="subtitle1"
        color="#A9A9A9"
        fontSize=".75rem"
        gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="#454545" mb={2}>
        {content}
      </Typography>
    </React.Fragment>
  );
};

const ExpenseModal = ({ open, onClose, expense }: ExpenseProps) => {
  if (!expense) {
    return null;
  }

  const expenseDetails = [
    {
      title: 'Merchant',
      content: expense.merchantName
    },
    {
      title: 'Category',
      content: expense.categoryName
    },
    {
      title: 'Amount',
      content: formatAmount(expense.amount)
    },
    {
      title: 'Description',
      content: expense.description
    },
    {
      title: 'Date',
      content: formatDate(expense.createdDate)
    },
    {
      title: 'Status',
      content: RECEIPT_STATUS[expense.workFlowId].text
    }
  ];

  return (
    <MHDialog
      open={open}
      title={' '}
      handleClose={onClose}
      scroll="paper"
      actions={null}
      maxWidth={'xs'}
      fullWidth>
      <Box px={2}>
        <Typography
          variant="body1"
          fontSize="1.2rem"
          fontFamily="Area-Normal-Black"
          color="primary.main"
          mb={3}
          gutterBottom>
          Expense Details
        </Typography>
        {expenseDetails.map((exp) => (
          <ExpenseDetail title={exp.title} content={exp.content as string} />
        ))}
      </Box>
    </MHDialog>
  );
};

export default ExpenseModal;
