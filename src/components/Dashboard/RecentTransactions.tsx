import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Zoom from '@mui/material/Zoom';
import { styled } from '@mui/material/styles';

import ArrowPanelBar from '../UI/ArrowPanelBar';
import { formatAmount } from '../../utils/utils';
import { ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  border: 0,
  mb: 3,
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: 'transparent',
  // '& td, & th': {
  //   border: 0
  // },
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover
  }
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0
  // }
}));

function createData(
  merchantName: string,
  merchantImgSrc: string,
  category: string,
  expenseDesc: string,
  expenseAmt: number,
  balanceAfterExpense: number
) {
  return {
    merchantName,
    merchantImgSrc,
    category,
    expenseDesc,
    expenseAmt,
    balanceAfterExpense
  };
}

const rows = [
  createData(
    'Sittercity',
    'https://res.cloudinary.com/mother-honestly/image/upload/v1658581169/sittercity_square_logo_1_t7zj5w.svg',
    'Petcare',
    'Vaccines',
    -50,
    495
  ),
  createData(
    'Care.com',
    'https://res.cloudinary.com/mother-honestly/image/upload/v1658581169/care_1_ofwdit.svg',
    'Childcare',
    'Medications',
    -76,
    599
  ),
  createData(
    'SnapHealth',
    'https://res.cloudinary.com/mother-honestly/image/upload/v1658581169/Snaphealth_1_g44p2m.svg',
    'Eldercare',
    'Consultation',
    -42,
    725
  )
];

function CustomizedTables() {
  return (
    <TableContainer>
      <Table aria-label="transactions table" padding="none">
        {/* <TableHead>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead> */}
        <TableBody sx={{
          pointerEvents: 'none'
        }}>
          {rows.map((row) => (
            <StyledTableRow key={row.merchantName}>
              <StyledTableCell
                sx={{
                  p: 0.5,
                  
                }}>
                <ListItem disablePadding disableGutters>
                  <ListItemAvatar>
                    <Avatar
                      alt={row.merchantName}
                      src={row.merchantImgSrc}
                      variant="rounded"
                      sx={{ width: 35, height: 35 }}
                    />
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography
                      variant="body1"
                      color="primary.main"
                      sx={{
                        fontWeight: 800
                      }}>
                      {row.merchantName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '0.7rem'
                      }}>
                      {row.category}
                    </Typography>
                  </ListItemText>
                </ListItem>

                {/* <Stack direction="row" spacing={2}>
                  <Stack>
                    <Typography
                      variant="body1"
                      color="primary.main"
                      sx={{
                        fontWeight: 800
                      }}>
                      {row.merchantName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '0.7rem'
                      }}>
                      {row.category}
                    </Typography>
                  </Stack>
                </Stack> */}
              </StyledTableCell>
              <StyledTableCell>{row.expenseDesc}</StyledTableCell>
              <StyledTableCell>{formatAmount(row.expenseAmt)}</StyledTableCell>
              <StyledTableCell>
                {formatAmount(row.balanceAfterExpense)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const RecentTransactions = () => {
  return (
    <Zoom in style={{ transitionDelay: '150ms' }}>
      <Stack
        border={1}
        borderColor="secondary.main"
        borderRadius={2}
        px={2}
        py={1.5}>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Typography variant="h3">Recent Transactions</Typography>
          <ArrowPanelBar />
        </Stack>
        <CustomizedTables />
      </Stack>
    </Zoom>
  );
};

export default RecentTransactions;
