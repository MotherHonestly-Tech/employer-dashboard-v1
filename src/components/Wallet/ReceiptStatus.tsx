import { styled, useTheme } from '@mui/material/styles';

type ReceiptStatusShape = {
  text: string;
  color: string;
  background: string;
};

export const RECEIPT_STATUS: { [key: number]: ReceiptStatusShape } = {
  1: {
    text: 'Pending',
    color: '#00A9CF',
    background: '#6AE4FF33'
  },
  2: {
    text: 'Under Review',
    color: '#CFAE00',
    background: '#FCFF6A33'
  },
  3: {
    text: 'Approved',
    color: '#089227',
    background: '#6AFF8B4A'
  },
  4: {
    text: 'Reimbursed',
    color: '#089227',
    background: '#6AFF8B4A'
  },
  5: {
    text: 'Declined',
    color: '#CF0000',
    background: '#FF6A6A33'
  }
};

const StyledReceiptStatus = styled('div')(({ theme }) => ({
  padding: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const ReceiptStatus = ({ status }: { status: number }) => {
  const receiptStatus = RECEIPT_STATUS[status];

  return (
    <StyledReceiptStatus
      sx={{
        backgroundColor: receiptStatus.background,
        color: receiptStatus.color
      }}>
      {receiptStatus.text}
    </StyledReceiptStatus>
  );
};

export default ReceiptStatus;
