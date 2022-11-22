import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

import RoundedLogoIcon from '../../theme/icons/RoundedLogo';
import AbsolutePositionedContainer from '../UI/AbsolutePositionedContainer';

import { ReactComponent as ChildCareIcon } from '../../static/svg/categories/child-care.svg';
import { ReactComponent as ChoiceFamilyIcon } from '../../static/svg/categories/choice-family.svg';
import { ReactComponent as ElderCareIcon } from '../../static/svg/categories/elder-care.svg';
import { ReactComponent as FoodIcon } from '../../static/svg/categories/food.svg';
import { ReactComponent as HouseholdIcon } from '../../static/svg/categories/household.svg';
import { ReactComponent as PetCareIcon } from '../../static/svg/categories/pet-care.svg';
import { ReactComponent as SelfCareIcon } from '../../static/svg/categories/self-care.svg';
import { ReactComponent as WorkLifeIcon } from '../../static/svg/categories/work-life.svg';
import { formatAmount } from '../../utils/utils';

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: '#F9F9F9',
  padding: 14,
  marginTop: 30,
  borderRadius: 8
}));

type ExpenseCategoryProps = {
  icon: React.ReactElement;
  title: string;
  color: string;
  amount: number;
  value: number;
};

const EXPENSE_CATEGORIES: ExpenseCategoryProps[] = [
  {
    icon: <ChildCareIcon />,
    title: 'Child Care',
    color: '#817EB9',
    amount: 3100,
    value: 13
  },
  {
    icon: <ChoiceFamilyIcon />,
    title: 'Choice Family',
    color: '#A0BDD2',
    amount: 2100,
    value: 9
  },
  {
    icon: <ElderCareIcon />,
    title: 'Elder Care',
    color: '#D49C9C',
    amount: 2900,
    value: 10
  },
  {
    icon: <FoodIcon />,
    title: 'Food',
    color: '#F9BA52',
    amount: 2100,
    value: 9
  },
  {
    icon: <HouseholdIcon />,
    title: 'Household',
    color: '#DADAF2',
    amount: 1100,
    value: 7
  },
  {
    icon: <PetCareIcon />,
    title: 'Pet Care',
    color: '#AFCEA0',
    amount: 700,
    value: 4
  },
  {
    icon: <SelfCareIcon />,
    title: 'Self Care',
    color: '#A43A3A',
    amount: 1700,
    value: 8
  },
  {
    icon: <WorkLifeIcon />,
    title: 'Work-Life',
    color: '#2A5D68',
    amount: 4200,
    value: 18
  }
];

const ExpenseCategory = (props: ExpenseCategoryProps) => {
  return (
    <ListItem
      sx={{
        bgcolor: 'common.white',
        px: 1,
        boxShadow: '0px 6px 8px -2px rgba(225, 225, 225, 0.25)'
      }}
      secondaryAction={
        <Box pr={1}>
          <Typography variant="body2" fontSize=".8rem" color={props.color}>
            {formatAmount(props.amount, 0)}
          </Typography>
          <Typography variant="body2" fontSize=".65rem" color="#8D8D8D">
            {props.value}%
          </Typography>
        </Box>
      }
      dense
      disableGutters>
      <ListItemAvatar
        sx={{
          minWidth: 'fit-content',
          mr: 1
        }}>
        <Avatar
          variant="rounded"
          sx={{
            width: 38,
            height: 38,
            bgcolor: props.color,
            '& svg': {
              width: 25,
              height: 25,
              objectFit: 'contain',
              objectPosition: 'center'
            }
          }}>
          {props.icon}
        </Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Stack color={props.color} spacing={0.8}>
          <Typography
            variant="subtitle2"
            fontSize="12px"
            color="primary.main"
            fontFamily="Area-Normal-Bold">
            {props.title}
          </Typography>
        </Stack>
      </ListItemText>
    </ListItem>
  );
};

const Category = (category: ExpenseCategoryProps) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center" whiteSpace="nowrap">
      <RoundedLogoIcon
        sx={{
          backgroundColor: category.color,
          width: 15,
          height: 15
        }}
      />
      <Typography component="span" variant="body2" fontSize=".75rem" sx={{
        m: 0,
        p: 0,
        paddingBlock: 0,
        lineHeight: 1
      }}>
        {category.title}
      </Typography>
    </Stack>
  );
};

const EmployeeExpenditure = () => {
  return (
    <Container>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 1.4
        }}>
        Employee Expenditure
      </Typography>

      <Stack direction="row" spacing={2}>
        <Box
          width={500}
          p={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative">
          <PieChart lineWidth={20} data={EXPENSE_CATEGORIES} animate />

          <AbsolutePositionedContainer>
            <Typography variant="h1" fontSize="2.4rem" align="center">
              $20,000
            </Typography>
            <Typography
              variant="body2"
              fontSize=".7rem"
              align="center"
              color="#8D8D8D">
              Total Amount Disbursed
            </Typography>
          </AbsolutePositionedContainer>
        </Box>

        <Divider orientation="vertical" variant="middle" flexItem light />

        <Grid container spacing={1} flexGrow={1}>
          {EXPENSE_CATEGORIES.map((category) => (
            <Grid item xs={6} key={category.title}>
              <ExpenseCategory {...category} />
            </Grid>
          ))}
        </Grid>
      </Stack>

      <Stack
        direction="row"
        mx="auto"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        mt={7}>
        {EXPENSE_CATEGORIES.map((category) => (
          <Category key={category.title} {...category} />
        ))}
      </Stack>
    </Container>
  );
};

export default EmployeeExpenditure;
