import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { styled, useTheme } from '@mui/material/styles';
import { formatAmount } from '../../utils/utils';

const StyledList = styled(List)(({ theme }) => ({
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  border: '1px solid #D4D4D4',
  padding: 0
}));

const StyledDetailList = styled(List)(({ theme }) => ({
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  border: '1px solid #D4D4D4',
  padding: 0
}));

const StyledDetailItem = styled(ListItem)(({ theme }) => ({
  padding: 10
}));

type InvoiceProps = {
  id: number;
  status: string;
  title: string;
  description: string;
  amount: number;
  recipient: string;
  date: string;
};

const InvoiceItem = (props: InvoiceProps) => {
  const Status = () => (
    <Box
      p={0.6}
      bgcolor="#D4D4D4"
      width="fit-content"
      fontSize=".65rem"
      borderRadius={1}>
      {props.status}
    </Box>
  );

  return (
    <div>
      <Status />
      <Typography variant="subtitle1" fontSize="0.85rem" mt={1} gutterBottom>
        {props.title}
      </Typography>
      <Typography variant="body2" fontSize=".75rem">
        {props.description}
      </Typography>
    </div>
  );
};

const Invoice = () => {
  const theme = useTheme();

  const [
    selectedInvoice,
    setSelectedInvoice
  ] = React.useState<InvoiceProps | null>(null);

  const INVOICES: InvoiceProps[] = [
    {
      id: 1,
      status: 'Paid',
      title: 'Additional  disbursement',
      description: 'Stipend for employees',
      amount: 7802.32,
      recipient: 'Jackson Adebayo',
      date: '12/11/2022'
    },
    {
      id: 2,
      status: 'Paid',
      title: 'Additional  disbursement',
      description: 'Stipend for employees',
      amount: 7802.32,
      recipient: 'Jackson Adebayo',
      date: '12/11/2022'
    },
    {
      id: 3,
      status: 'Paid',
      title: 'Additional  disbursement',
      description: 'Stipend for employees',
      amount: 7802.32,
      recipient: 'Jackson Adebayo',
      date: '12/11/2022'
    }
  ];

  const isSelected = (invoice: InvoiceProps): boolean => {
    if (!selectedInvoice) {
      return false;
    }

    return selectedInvoice.id === invoice.id;
  };

  return (
    <Box px={5}>
      <Typography variant="subtitle1" fontSize="1.25rem" mb={3}>
        Invoice Details
      </Typography>

      <Stack direction="row">
        <Box sx={{ width: '100%', maxWidth: 400, maxHeight: 700 }}>
          <StyledList>
            {INVOICES.map((invoice, index) => (
              <ListItem
                disablePadding
                divider={index !== INVOICES.length - 1}
                secondaryAction={
                  <Typography variant="subtitle1">
                    {formatAmount(invoice.amount)}
                  </Typography>
                }>
                <ListItemButton
                  selected={isSelected(invoice)}
                  onClick={() => setSelectedInvoice(invoice)}>
                  <ListItemText primary={<InvoiceItem {...invoice} />} />
                </ListItemButton>
              </ListItem>
            ))}
          </StyledList>
        </Box>

        {selectedInvoice && (
          <Box sx={{ width: '100%', maxWidth: 500, maxHeight: 700 }}>
            <StyledDetailList>
              <ListItem
                divider
                secondaryAction={
                  <Typography variant="subtitle2" fontSize="0.85rem">
                    {formatAmount(selectedInvoice.amount)}
                  </Typography>
                }>
                <ListItemText primary="Amount" />
              </ListItem>
              <ListItem
                divider
                secondaryAction={
                  <Typography variant="subtitle2" fontSize="0.85rem">
                    {selectedInvoice.title}
                  </Typography>
                }>
                <ListItemText primary="Type" />
              </ListItem>
              <ListItem
                divider
                secondaryAction={
                  <Typography variant="subtitle2" fontSize="0.85rem">
                    {selectedInvoice.recipient}
                  </Typography>
                }>
                <ListItemText primary="Recipient" />
              </ListItem>
              <ListItem
                divider
                secondaryAction={
                  <Typography variant="subtitle2" fontSize="0.85rem">
                    {selectedInvoice.date}
                  </Typography>
                }>
                <ListItemText primary="Paid on" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <div>
                      <Typography paragraph>Description</Typography>
                      <Typography variant="subtitle2" fontSize="0.85rem">
                        {selectedInvoice.description}
                      </Typography>
                    </div>
                  }
                />
              </ListItem>
            </StyledDetailList>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default Invoice;
