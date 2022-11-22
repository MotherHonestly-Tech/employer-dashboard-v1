import React from 'react';

import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import SearchField from '../Form/SearchField';
import { ReactComponent as SearchIcon } from '../../static/svg/search.svg';
import DashboardContext from '../../store/context/dashboard.context';
import { Merchant } from '../../models/wallet.model';

export const MerchantList = () => {
  // let merchantList: Merchant[] = [
  //   {
  //     id: 1,
  //     merchant: 'Sittercity',
  //     categories: 'Childcare',
  //     iconUrl:
  //       'https://res.cloudinary.com/mother-honestly/image/upload/v1658581169/sittercity_square_logo_1_t7zj5w.svg'
  //   },
  //   {
  //     id: 2,
  //     merchant: 'Care.com',
  //     categories: 'Petcare, Childcare, Eldercare',
  //     iconUrl:
  //       'https://res.cloudinary.com/mother-honestly/image/upload/v1658581169/care_1_ofwdit.svg'
  //   },
  //   {
  //     id: 13,
  //     merchant: 'SnapHealth',
  //     categories: 'Petcare, Childcare, Eldercare',
  //     iconUrl:
  //       'https://res.cloudinary.com/mother-honestly/image/upload/v1658581169/Snaphealth_1_g44p2m.svg'
  //   }
  // ];

  const dashboardCtx = React.useContext(DashboardContext);
  const { staticDataCacheMap } = dashboardCtx;

  const merchants = staticDataCacheMap.get('merchants')
    ? (staticDataCacheMap.get('merchants') as Merchant[]).filter(
        (merchant) => merchant.id !== -1
      )
    : [];

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Merchants
      </Typography>
      <List
        sx={{
          flexGrow: 1
        }}>
        <SearchField
          icon={<SearchIcon width="1rem" />}
          placeholder="Search for a Merchant"
          bgcolor="#FFFFFF"
        />
        {merchants.map((merchant, index) => (
          <ListItem
            component={'button'}
            key={index}
            sx={{
              mt: index < 1 ? 2 : 0
            }}
            disableGutters>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                alt={merchant.merchantName}
                src={merchant.logoUrl}
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
              <Typography
                variant="body2"
                className=""
                color="#194049"
                sx={{ fontSize: '12px' }}>
                {merchant.merchantName}
              </Typography>
              <Typography
                variant="body1"
                className=""
                sx={{ fontSize: '10px' }}
                color="#989898">
                {merchant.categoryList
                  .map((category) => category.categoryName)
                  .join(', ')}
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
