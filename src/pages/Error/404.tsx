import Box from '@mui/material/Box';

import { ReactComponent as NotFoundIcon } from '../../static/svg/page_not_found.svg';

const NotFound = () => {
  return (
    <Box display="flex" alignItems={'center'} justifyContent="center">
        <NotFoundIcon width="28rem" />
    </Box>
  );
};

export default NotFound;