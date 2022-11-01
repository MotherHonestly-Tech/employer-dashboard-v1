import * as React from 'react';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

import IconButtonStyled from '../Button/IconButtonStyled';
import { ReactComponent as EmptyDataIcon } from '../../static/svg/table-data.svg';

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

export type GridColDef<T> = {
  field: string;
  headerName: string;
  width: number;
  type: 'number' | 'text' | 'date';
  align?: 'left' | 'right' | 'center';
  valueGetter?: (params: T) => any;
  cellRenderer?: (params: T) => React.ReactNode;
  description?: string;
};

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const StyledTableContainer = styled(TableContainer)<{
  containerstyles?: object;
}>(({ theme, containerstyles }) => ({
  width: '100%',
  overflowX: 'auto',
  overflowY: 'auto',
  maxHeight: '100%',
  border: '1px solid #E0E0E0',
  borderRadius: '12px',
  backgroundColor: '#fff',
  ...(containerstyles && containerstyles)
  // '&:last-child': {
  //     borderBottom: 'none'
  // }
}));

const StyledTableCell = styled(TableCell)<{
  headerstyles?: object;
  bodystyles?: object;
}>(({ theme, headerstyles, bodystyles }) => ({
  fontFamily: theme.typography.body1.fontFamily,
  padding: 10,
  borderBottom: '1px solid rgb(241 245 249)',
  borderRight: '1px solid rgb(241 245 249)',
  //   mb: 3,
  [`&.${tableCellClasses.head}`]: {
  fontFamily: theme.typography.subtitle2.fontFamily,
  // borderTop: '10px solid #fbf78d',
    background: '#EEEEEE',
    color: '#A1A1A1',
    fontSize: '0.8rem',
    ...(headerstyles && headerstyles)
  },
  [`&.${tableCellClasses.body}`]: {
    background: theme.palette.common.white,
    fontSize: '0.75rem',
    color: '#637075',
    ...(bodystyles && bodystyles)
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: 'transparent',
  // '& td, & th': {
  //   border: 0
  // },
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    // border: 0
  }
}));

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const pageLimit = Math.ceil(count / rowsPerPage);
  const pages: Array<number> =
    count / rowsPerPage > 1
      ? Array.from(Array(Math.ceil(count / rowsPerPage)).keys())
      : [0];

  const getPaginationGroup = () => {
    let start = Math.floor(page / pageLimit) * pageLimit;
    return new Array(pageLimit).fill(0).map((_, idx) => start + idx);
  };

  // console.log(getPaginationGroup());

  return (
    <Stack
      direction="row"
      justifyContent={'center'}
      spacing={3}
      whiteSpace="nowrap"
      mx="auto"
      my={3}>
      {getPaginationGroup().map((pageNumber) => (
        <IconButtonStyled
          key={pageNumber}
          onClick={($event: React.MouseEvent<HTMLButtonElement>) =>
            onPageChange($event, pageNumber)
          }>
          <PaginationItem
            sx={{
              height: '30px',
              width: '30px',
              position: 'relative',
              ...(page === pageNumber
                ? {
                    backgroundColor: '#fbf78d',
                    color: theme.palette.grey[700],
                    borderColor: '#fbf78d'
                  }
                : {
                    backgroundColor: 'transparent',
                    color: theme.palette.grey[500],
                    borderColor: '#E0E0E0'
                  })
            }}>
            <span
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'inherit'
              }}>
              {pageNumber + 1}
            </span>
          </PaginationItem>
        </IconButtonStyled>
      ))}
    </Stack>
  );
}

const PaginationItem = styled('li')(({ theme }) => ({
  display: 'block',
  width: '25px',
  paddingBlock: '4px',
  listStyle: 'none',
  border: '1px solid #E0E0E0',
  color: '#C8C8C8',
  borderRadius: '4px'
}));

export default function MHDataTable<T>({
  rows,
  columns,
  frontEndPagination,
  ...props
}: {
  rows: any[];
  columns: GridColDef<T>[];
  frontEndPagination: boolean;
  containerStyles?: object;
  headerStyles?: object;
  bodyStyles?: object;
}) {
  // Front end pagination is active by default
  // TO DO: Write logic for server side pagination
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const slicedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <StyledTableContainer containerstyles={props.containerStyles}>
        <Table
          aria-label="transactions table"
          padding="none"
          sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {columns.map(({ headerName, width, align }) => (
                <StyledTableCell
                  key={headerName}
                  width={width}
                  align={align || 'left'}
                  headerstyles={props.headerStyles}>
                  {headerName}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedRows.map((row) => (
              <StyledTableRow
                key={row.id}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {columns.map((col, i) => {
                  const {
                    field,
                    headerName,
                    width,
                    align,
                    type,
                    valueGetter,
                    cellRenderer,
                    description
                  } = col;
                  const value = valueGetter ? valueGetter(row) : row[field];
                  return (
                    <StyledTableCell
                      //   component="th"
                      scope="row"
                      key={i}
                      width={width}
                      align={align || 'left'}
                      bodystyles={props.bodyStyles}>
                      {cellRenderer ? cellRenderer(row) : value}
                      {/* {description && <Typography variant="body2">{description}</Typography>} */}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

        {slicedRows.length === 0 && (
          <Stack
            justifyContent="center"
            alignItems="center"
            minHeight="300px"
            minWidth="100%">
            <EmptyDataIcon />
            <Typography variant="body2" mt={2}>
              No transactions data
            </Typography>
          </Stack>
        )}
      </StyledTableContainer>

      {slicedRows.length > 0 && (
        <TablePaginationActions
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      )}
    </React.Fragment>
  );
}

// const handleFirstPageButtonClick = (
//   event: React.MouseEvent<HTMLButtonElement>
// ) => {
//   onPageChange(event, 0);
// };

// const handleBackButtonClick = (
//   event: React.MouseEvent<HTMLButtonElement>
// ) => {
//   onPageChange(event, page - 1);
// };

// const handleLastPageButtonClick = (
//   event: React.MouseEvent<HTMLButtonElement>
// ) => {
//   onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
// };

{
  /* <IconButtonStyled
onClick={handleFirstPageButtonClick}
disabled={page === 0}
aria-label="first page">
{theme.direction === 'rtl' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
</IconButtonStyled>
<IconButtonStyled
onClick={handleBackButtonClick}
disabled={page === 0}
aria-label="previous page">
{theme.direction === 'rtl' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
</IconButtonStyled>
<IconButtonStyled
onClick={handleNextButtonClick}
disabled={page >= Math.ceil(count / rowsPerPage) - 1}
aria-label="next page">
{theme.direction === 'rtl' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
</IconButtonStyled>
<IconButtonStyled
onClick={handleLastPageButtonClick}
disabled={page >= Math.ceil(count / rowsPerPage) - 1}
aria-label="last page">
{theme.direction === 'rtl' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
</IconButtonStyled> */
}

{
  /* <Box sx={{ flexShrink: 0, ml: 2.5 }}>
<Typography variant="caption">
  {`${page * rowsPerPage + 1}-${
    page * rowsPerPage + rowsPerPage < count
      ? page * rowsPerPage + rowsPerPage
      : count
  } of ${count}`}
</Typography>
</Box> */
}
