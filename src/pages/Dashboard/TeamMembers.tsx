import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import MHButton from '../../components/Button/MHButton';
import MHDataTable, {
  GridColDef
} from '../../components/DataTable/MHDataTable';

import { ReactComponent as PlusIcon } from '../../static/svg/plus.svg';
import AddMember from '../../components/TeamMembers/AddMember';
import StyledActionButton from '../../components/Button/StyledActionButton';

type MEMBER_SHAPE = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

const TeamMembers = () => {
  const MEMBERS: MEMBER_SHAPE[] = [
    {
      id: 1,
      firstName: 'Killian',
      lastName: 'Dain',
      email: 'killiand@unilever.com',
      role: 'Admin'
    },
    {
      id: 2,
      firstName: 'Eric',
      lastName: 'Young',
      email: 'ericy@unilever.com',
      role: 'Admin'
    },
    {
      id: 3,
      firstName: 'Alexander',
      lastName: 'Wolfe',
      email: 'alexw@unilever.com',
      role: 'Admin'
    }
  ];

  const columns: GridColDef<MEMBER_SHAPE>[] = [
    {
      headerName: 'Member',
      type: 'text',
      field: 'email',
      width: 300,
      valueGetter: (row: MEMBER_SHAPE) => `${row.firstName} ${row.lastName}`
    },
    {
      headerName: 'Role',
      type: 'text',
      field: 'role',
      width: 200
    },
    {
      headerName: 'Action',
      type: 'text',
      field: '',
      width: 150,
      align: 'center',
      cellRenderer: (row: MEMBER_SHAPE) => (
        <Stack direction="row" spacing={3} justifyContent="center">
          <StyledActionButton
            color="secondary"
            variant="contained"
            >
            View
          </StyledActionButton>
          <StyledActionButton color="error" variant="contained" >
            Remove
          </StyledActionButton>
        </Stack>
      )
    }
  ];

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        pt: 3
      }}>
      <Box mb={4}>
        <Typography variant="h1" align="center" paragraph>
          Admin Member
        </Typography>
        <Typography variant="body2" color="#9C9C9C">
          Member with the Team Management permission have the ability to upload
          csv of employees and feature permissions, and indirectly have access
          to all features in the employer dashboard.
        </Typography>
      </Box>

      <Stack direction="row" justifyContent="flex-end" my={3}>
        <MHButton
          startIcon={<PlusIcon />}
          onClick={handleOpen}
          sx={{
            width: 200
          }}>
          Add a new member
        </MHButton>
      </Stack>

      <MHDataTable rows={MEMBERS} columns={columns} frontEndPagination />

      {open && <AddMember open={open} onClose={handleClose} />}
    </Container>
  );
};

export default TeamMembers;
