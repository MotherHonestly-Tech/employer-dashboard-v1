import React from 'react';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import SearchFilter from '../../components/Coaching/SearchFilter';
import { ReactComponent as ConsultantIcon } from '../../static/svg/brand/consultant.svg';
import CoachTemp from '../../components/Coaching/CoachTemp';
import useHttp from '../../hooks/use-http';
import { HttpResponse } from '../../models/api.interface';
import { Consultant } from '../../models/coaching.model';

const Coaching = () => {
  const history = useHistory();

  const [consultants, setConsultants] = React.useState<Consultant[]>([]);

  const { loading, error, sendHttpRequest } = useHttp();

  React.useEffect(() => {
    sendHttpRequest(
      'https://ms.motherhonestly.co/api/motherboards',
      {
        method: 'GET'
      },
      (response: HttpResponse<Consultant[]>) => {
        const mappedRes = response.data.map((item) => ({
          ...item,
          headShotUrl:
            'https://ms.motherhonestly.co/assets/' + item.headShotName
        }));
        setConsultants(mappedRes);
      }
    );
  });

  return (
    <React.Fragment>
      <Box py={7} minHeight="200px">
        <Typography variant="h1" align="center" paragraph>
          1:1 Coaching For Career, Caregiving & More
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
          mt={2}>
          <ConsultantIcon width="1.3rem" />
          <Typography
            variant="subtitle2"
            color="#194049"
            fontSize=".7rem"
            textTransform="uppercase">
            Consultants
          </Typography>
        </Stack>
      </Box>

      <SearchFilter />

      <Grid container rowSpacing={4} columnSpacing={2} mt={2}>
        {consultants.map((consultant, index) => {
          return (
            <Grid item xs={3} minHeight="450px" display="flex" alignItems="stretch">
              <CoachTemp
                coach={consultant}
                onMouseClick={() => {
                  history.push(
                    '/organization/coaching/booking/' +
                      consultant.slug +
                      '/' +
                      consultant.uuid
                  );
                }}
              />
            </Grid>
          );
        })}
        {/* <Grid item xs={4}>
          <CoachTemp />
        </Grid>
        <Grid item xs={4}>
          <CoachTemp />
        </Grid>
        <Grid item xs={4}>
          <CoachTemp />
        </Grid>
        <Grid item xs={4}>
          <CoachTemp />
        </Grid>
        <Grid item xs={4}>
          <CoachTemp />
        </Grid>
        <Grid item xs={4}>
          <CoachTemp />
        </Grid>
        <Grid item xs={4}>
          <CoachTemp />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
};

export default Coaching;
