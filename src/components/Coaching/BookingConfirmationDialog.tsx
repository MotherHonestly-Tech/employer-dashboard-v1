import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import MHDialog from '../Dialog/MHDialog';
import { MHSelect } from '../Form/MHSelect';

import { ReactComponent as CheckMarkIcon } from '../../static/svg/check-mark-md.svg';
import * as validators from '../../utils/validators';
import * as constants from '../../utils/constants';
import useInput from '../../hooks/use-input';

const BookingConfirmationDialog = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const {
    value: enteredCalendarType,
    valid: enteredCalendarTypeIsValid,
    onChange: calendarTypeInputChangeHandler,
    onBlur: calendarTypeInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  return (
    <MHDialog
      title={' '}
      open={open}
      handleClose={onClose}
      scroll="paper"
      maxWidth="sm"
      actions={null}
      fullWidth>
      <Box
        sx={{
          '& > svg': {
            textAlign: 'center',
            mx: 'auto',
            my: 2
          }
        }}>
        <CheckMarkIcon />
        <Typography variant="h2" align="center" color="#194049" paragraph>
          Your Booking is Confirmed
        </Typography>

        <Typography
          variant="body2"
          color="#194049"
          textTransform="uppercase"
          fontSize=".6rem"
          align="center"
          fontFamily="Area-Normal-Bold"
          sx={{
            my: 3
          }}
          paragraph>
          Your Consultation
        </Typography>

        <Divider
          light
          variant="middle"
          sx={{
            my: 1.5
          }}
        />

        <Typography
          variant="subtitle1"
          color="#194049"
          align="center"
          fontFamily="Area-Normal-Bold"
          paragraph>
          Kanika Chadda
        </Typography>

        <Typography
          variant="body1"
          color="#194049"
          align="center"
          sx={{
            opacity: 0.8
          }}
          gutterBottom>
          1:1 Video Consultation
        </Typography>

        <Typography
          variant="body2"
          color="#194049"
          align="center"
          sx={{
            opacity: 0.8
          }}
          gutterBottom>
          Sunday, September 4
        </Typography>

        <Typography
          variant="body2"
          color="#194049"
          align="center"
          sx={{
            opacity: 0.8,
            mb: 3
          }}
          paragraph>
          5:00pm - 6:00pm
        </Typography>

        <Typography
          variant="body1"
          fontSize=".8rem"
          color="#194049"
          align="center"
          paragraph
          sx={{
            mb: 3
          }}>
          60 minutes - confidential
        </Typography>

        <Box mx="auto" width={300}>
          <MHSelect
            placeholder="Add to My Calendar"
            value={enteredCalendarType}
            options={constants.CALENDAR_TYPES}
            onChange={(val) => calendarTypeInputChangeHandler(val as string)}
            onBlur={calendarTypeInputBlurHandler}
          />
        </Box>
      </Box>
    </MHDialog>
  );
};

export default BookingConfirmationDialog;
