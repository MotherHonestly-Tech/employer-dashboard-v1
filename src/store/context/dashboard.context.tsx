import React from 'react';

import { SelectOption } from '@mui/base';

import useHttp from '../../hooks/use-http';

import AuthContext from './auth-context';
import { HttpResponse } from '../../models/api.interface';
import { Category, Merchant } from '../../models/wallet';

type DashboardCtxType = {
  staticDataCacheMap: Map<string, any[]>;
};

const DashboardContext = React.createContext<DashboardCtxType>({
  staticDataCacheMap: new Map<string, any[]>()
});

export const DashboardContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [dataCacheMap, setDataCacheMap] = React.useState<Map<string, any[]>>(
    new Map()
  );

  const authCtx = React.useContext(AuthContext);
  const { loading, error, sendHttpRequest: fetchCategories } = useHttp();
  const { sendHttpRequest: fetchMerchants } = useHttp();

  const reqOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authCtx.token}`
    }
  };

  React.useEffect(() => {
    fetchCategories(
      process.env.REACT_APP_API_BASE_URL + 'employee/dashboard/category/all',
      reqOptions,
      (response: HttpResponse<Category[]>) => {
        setCategoryData(response.data);
      }
    );

    fetchMerchants(
      process.env.REACT_APP_API_BASE_URL + 'employee/dashboard/merchant/all',
      reqOptions,
      (response: HttpResponse<Merchant[]>) => {
        setMerchantData(response.data);
      }
    );
  }, []);

  const setCategoryData = (categories: Category[]) => {
    setDataCacheMap((prevState) => {
      const newState = new Map(prevState);
      const mappedCategories: (Category &
        SelectOption<string>)[] = categories.map((category) => ({
        ...category,
        value: category.id + '',
        label: category.categoryName
      }));
      newState.set('categories', mappedCategories);
      return newState;
    });
  };

  const setMerchantData = (merchants: Merchant[]) => {
    setDataCacheMap((prevState) => {
      const newState = new Map(prevState);
      const mappedMerchants: (Merchant & SelectOption<string>)[] = merchants
        .concat({
          id: -1,
          merchantName: 'Other'
        } as Merchant)
        .map((merchant) => ({
          ...merchant,
          value: merchant.id + '',
          label: merchant.merchantName
        }));
      newState.set('merchants', mappedMerchants);
      return newState;
    });
  };

  const contextValue: DashboardCtxType = {
    staticDataCacheMap: dataCacheMap
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {/* {error && <Notification type="error" message={error.message} />} */}
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;