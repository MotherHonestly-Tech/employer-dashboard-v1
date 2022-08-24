import React from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

import DashboardContext from '../../store/context/dashboard.context';
import { Category } from '../../models/wallet';

const BorderLinearProgress = styled(LinearProgress)<{ barcolor: string }>(
  ({ theme, color, barcolor }) => ({
    height: 7,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: barcolor
    },
    [`&.${linearProgressClasses.root}::before`]: {
      background: '#D9D9D9',
      boxShadow: 'inset 0px 0px 3px rgba(83, 83, 83, 0.25)'
    }
  })
);

export const CategoryList = () => {
  const dashboardCtx = React.useContext(DashboardContext);
  const { staticDataCacheMap } = dashboardCtx;

  const categories = staticDataCacheMap.get('categories')
    ? (staticDataCacheMap.get('categories') as Category[]).filter(
        (category) => category.id !== -1
      )
    : [];

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Care Categories
      </Typography>
      <List
        sx={{
          flexGrow: 1
        }}>
        {categories.map((category, index) => (
          <ListItem
            component={'button'}
            key={index}
            disableGutters>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                alt={category.categoryName}
                src={category.icon}
                sx={{
                  bgcolor: category.colorCode,
                  '& img': {
                    width: 25,
                    height: 25
                  }
                }}
              />
            </ListItemAvatar>
            <ListItemText>
              <Typography variant="subtitle1" fontSize="12px" color="primary.main" fontFamily="Area-Normal-Bold">
                {category.categoryName}
              </Typography>
              <Stack color={category.colorCode} spacing={.8}>
                <BorderLinearProgress
                  variant="determinate"
                  value={20}
                  barcolor={category.colorCode}
                />
                <Typography variant="body2" fontSize={'.6rem'} color="#989898">
                    20%
                </Typography>
              </Stack>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
