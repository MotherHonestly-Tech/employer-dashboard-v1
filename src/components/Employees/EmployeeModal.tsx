import React from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import MHButton from '../Button/MHButton';
import MHDialog from '../Dialog/MHDialog';

import { formatAmount, constructSlashSeperatedDateFormat } from '../../utils/utils';
import { EmployeeData } from '../../models/employee.model';

type ExpenseProps = {
  open: boolean;
  onClose: () => void;
  employee: EmployeeData | null;
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

const EmployeeModal = ({ open, onClose, employee }: ExpenseProps) => {
  if (!employee) {
    return null;
  }

  const employeeDetails = [
    {
      title: 'Name',
      content: employee.name
    },
    {
      title: 'Category',
      content: employee.title
    },
    // {
    //   title: 'Description',
    //   content: employee.
    // }
    // {
    //   title: 'Amount',
    //   content: formatAmount(employee.recentPayout)
    // },
  
    // {
    //   title: 'Date',
    //   content: constructSlashSeperatedDateFormat(employee.recentPayoutDate)
    // },
    // {
    //   title: 'Status',
    //   content: RECEIPT_STATUS[employee.workFlowId].text
    // }
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
          Employee Details
        </Typography>
        {employeeDetails.map((exp) => (
          <ExpenseDetail title={exp.title} content={exp.content as string} />
        ))}
      </Box>
    </MHDialog>
  );
};

export default EmployeeModal;
