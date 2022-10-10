import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import useInput from '../../hooks/use-input';
import * as validators from '../../utils/validators';
import MHFormControl from '../Form/MHFormControl';
import MHButton from '../Button/MHButton';
import { formatAmount } from '../../utils/utils';
import InfoText from '../UI/InfoText';
import BookingConfirmationDialog from './BookingConfirmationDialog';

const PricingGrid = ({ title, amount }: { title: string; amount: number }) => (
  <Grid container mb={1}>
    <Grid item xs={6}>
      <Typography align="left">{title}</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography
        variant="body1"
        fontFamily="Area-Normal-Black"
        color="primary.main"
        align="right">
        {amount ? formatAmount(amount) : '-'}
      </Typography>
    </Grid>
  </Grid>
);

const Pricing = ({ total }: { total: number }) => {
  return (
    <Box>
      <PricingGrid title="Subtotal" amount={0.0} />
      <PricingGrid title="Discount" amount={0.0} />

      <Divider light sx={{ my: 1 }} />

      <PricingGrid title="Total" amount={total} />
    </Box>
  );
};

const BookingSummary = () => {
  const {
    value: enteredIssue,
    valid: enteredIssueIsValid,
    onChange: issueInputChangeHandler,
    onBlur: issueInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const {
    value: enteredCoachingNeed,
    valid: enteredCoachingNeedIsValid,
    onChange: coachingNeedInputChangeHandler,
    onBlur: coachingNeedInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const {
    value: enteredPhoneNumber,
    valid: enteredPhoneNumberIsValid,
    onChange: phoneNumberInputChangeHandler,
    onBlur: phoneNumberInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleOpen();
  };

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Box border={1} borderColor="#F3F4F6" p={4}>
            <Typography variant="h1" color="#194049" paragraph>
              Your Consultation
            </Typography>

            <Typography variant="subtitle1" color="#194049" paragraph>
              Kanika Chadda
            </Typography>

            <Typography
              variant="body2"
              color="#194049"
              sx={{
                opacity: 0.8
              }}>
              1:1 Video Consultation
            </Typography>

            <Typography
              variant="body2"
              color="#194049"
              sx={{
                opacity: 0.8
              }}>
              Sunday, September 4
            </Typography>

            <Typography
              variant="body2"
              color="#194049"
              sx={{
                opacity: 0.8
              }}
              paragraph>
              5:00pm - 6:00pm
            </Typography>

            <Typography variant="body1" color="#194049">
              60 minutes - confidential | $50
            </Typography>

            <Divider
              light
              sx={{
                my: 4
              }}
            />

            <Typography
              variant="subtitle1"
              color="#194049"
              fontSize="1.5rem"
              paragraph>
              Notes for your 1:1 Personalized Consultation
            </Typography>

            <Box component="form" onSubmit={submitHandler}>
              <MHFormControl
                id="home-or-work-issues"
                type="text"
                label="What’s going on at home/work?"
                placeholder="This will let your coach know what issues to discuss during your consultation"
                value={enteredIssue}
                onChange={issueInputChangeHandler}
                onBlur={issueInputBlurHandler}
                multiline
              />

              <MHFormControl
                id="feedback-coaching-advice-needs"
                type="text"
                label="Where do you need feedback, coaching or advice?"
                placeholder="This will let your coach know what issues to discuss during your consultation"
                value={enteredCoachingNeed}
                onChange={coachingNeedInputChangeHandler}
                onBlur={coachingNeedInputBlurHandler}
                multiline
              />

              <MHFormControl
                id="phone-number"
                type="text"
                label="Please provide a valid phone number to reach you*?"
                placeholder="0000-0000"
                value={enteredPhoneNumber}
                onChange={phoneNumberInputChangeHandler}
                onBlur={phoneNumberInputBlurHandler}
              />

              <MHButton type="submit" fullWidth>
                Complete Booking
              </MHButton>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Box border={1} borderColor="#F3F4F6" p={2}>
            <ListItem
              component={'button'}
              sx={{
                mb: 2
              }}
              disableGutters>
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  // alt={merchant.merchantName}
                  // src={merchant.logoUrl}
                  sx={{
                    bgcolor: '#ffffff',
                    '& img': {
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center'
                    }
                  }}
                />
              </ListItemAvatar>
              <ListItemText>
                <Typography variant="subtitle1" color="#194049" gutterBottom>
                  1:1 Video Consultation: 15 mins with Kanika Chadda
                </Typography>
                <Typography variant="body2" color="#194049" fontSize=".7rem">
                  $50 Per 60m Session
                </Typography>
              </ListItemText>
            </ListItem>

            <Pricing total={50} />

            <InfoText message="Please note the value of this consultation will be deducted from Work-Life Wallet" />
          </Box>
        </Grid>
      </Grid>

      <BookingConfirmationDialog open={open} onClose={handleClose} />
    </React.Fragment>
  );
};

export default BookingSummary;
