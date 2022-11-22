import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import UploadButton from '../../components/Form/UploadButton';
import AddEmployees from '../../components/UploadEmployees/AddEmployees';
import RoundedLogoIcon from '../../theme/icons/RoundedLogo';

import { ReactComponent as PlusIcon } from '../../static/svg/plus-lg.svg';
import MHDataTable, {
  GridColDef
} from '../../components/DataTable/MHDataTable';
import Employees from '../../components/EmployerInsights/Employees';

type UploadHistoryType = {
  id: number;
  date: string;
  fileName: string;
  size: string;
};

const UploadWidget = () => (
  <Box py={3}>
    <Typography variant="h3" align="center" paragraph>
      Upload Employee Spreadsheet
    </Typography>

    <Typography
      variant="body1"
      fontFamily={'Area-Normal-Bold'}
      color="#194049"
      gutterBottom>
      Drop your file here, or
      <Typography component="span" color="#009688">
        {' '}
        browse
      </Typography>
    </Typography>
    <Typography variant="body1" color="#A6A6A6" fontSize="10px" gutterBottom>
      Supports csv, xls, xlsx
    </Typography>
    <Typography variant="body1" color="#A6A6A6" align="center" fontSize="10px">
      (maximum size 2mb)
    </Typography>
  </Box>
);

const UploadEmployees = () => {
  const uploadBtnRef = React.useRef<any>(null);

  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [isDragActive, setIsDragActive] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = Array.from(e.target.files as FileList);
    validateUploadedFile(file);
  };

  const dragFileInHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    setIsDragActive(true);
  };

  const dragFileOutHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    setIsDragActive(false);
  };

  const dropFileHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    const [file] = Array.from(e.dataTransfer.files as FileList);
    validateUploadedFile(file);
    setIsDragActive(false);
  };

  const validateUploadedFile = (file: File) => {
    const fileRef = uploadBtnRef.current;

    if (!file) {
      return;
    }

    setUploadedFile(file);
  };

  const UPLOAD_HISTORY: UploadHistoryType[] = [
    {
      id: 1,
      date: '01/09/2022',
      fileName: 'Employee_Export20/30/24.csv',
      size: '230'
    },
    {
      id: 2,
      date: '01/09/2022',
      fileName: 'Employee_Export20/30/24.csv',
      size: '149'
    },
    {
      id: 3,
      date: '01/09/2022',
      fileName: 'Employee_Export20/30/24.csv',
      size: '87'
    }
  ];

  const columns: GridColDef<UploadHistoryType>[] = [
    {
      headerName: 'Date',
      type: 'text',
      field: 'date',
      width: 100
    },
    {
      headerName: 'File',
      type: 'text',
      field: 'fileName',
      width: 200
    },
    {
      headerName: 'Number of employees',
      type: 'text',
      field: 'size',
      width: 150
    }
  ];

  return (
    <React.Fragment>
      <Container
        maxWidth="lg"
        sx={{
          pt: 3
        }}>
        <Box mb={4}>
          <Typography variant="h1" align="center" paragraph>
            Upload Employees
          </Typography>
        </Box>

        <Grid container mb={10}>
          <Grid item xs={8.5} px={1}>
            <UploadButton
              htmlFor="csv-upload"
              file={uploadedFile}
              onChange={uploadChangeHandler}
              element={<UploadWidget />}
              onDragEnter={dragFileInHandler}
              onDragLeave={dragFileOutHandler}
              onDrop={dropFileHandler}
              accept="image/*,application/pdf,.jpg,image/jpeg,image/png"
              isDragActive={isDragActive}
              ref={uploadBtnRef}
              containerSx={{
                flexGrow: 1
              }}
            />
          </Grid>

          <Divider orientation="vertical" light flexItem>
            or
          </Divider>

          <Grid item xs={3} px={1}>
            <Stack
              alignItems="center"
              justifyContent="center"
              border={2}
              borderColor="#C1C1C1"
              borderRadius={(theme) => theme.shape.borderRadius}
              height="100%"
              onClick={handleOpen}
              sx={{
                cursor: 'pointer'
              }}>
              <Typography variant="h3" align="center" gutterBottom>
                Add Employee
              </Typography>

              <Typography variant="body1" align="center" paragraph>
                Click to enter email address
              </Typography>

              <RoundedLogoIcon>
                <PlusIcon color="#C5C5C5" />
              </RoundedLogoIcon>
            </Stack>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" paragraph>Employees</Typography>
        <Employees />

        <Typography variant="subtitle1" paragraph>Upload History</Typography>
        <MHDataTable
          rows={UPLOAD_HISTORY}
          columns={columns}
          frontEndPagination
        />
      </Container>

      {open && <AddEmployees open={open} onClose={handleClose} />}
    </React.Fragment>
  );
};

export default UploadEmployees;
