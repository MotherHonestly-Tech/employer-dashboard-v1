import React from 'react';

import Box from '@mui/material/Box';
import { SelectOption } from '@mui/base';

import BackdropLoader from '../../components/Loading/BackdropLoader';
import useHttp from '../../hooks/use-http';

import { HttpResponse } from '../../models/api.interface';
import {
  Category,
  CategoryName,
  ExpensePerCategory,
  Merchant
} from '../../models/wallet.model';
import { Organization } from '../../models/employer.model';
import { getURLWithQueryParams } from '../../utils/utils';
import AuthContext from './auth-context';

type DashboardCtxType = {
  staticDataCacheMap: Map<string, any[]>;
  organization: Organization | null;
  computeCategoryExpenses: (
    expensePerCategory: ExpensePerCategory,
    totalExpenses: number
  ) => void;
  fetchOrganizationData: (employerRefId: number) => void;
  // updateEmployerData: (emp: EmployerOnboarding) => void;
};

const DashboardContext = React.createContext<DashboardCtxType>({
  staticDataCacheMap: new Map<string, any[]>(),
  organization: null,
  computeCategoryExpenses: (
    expensePerCat: ExpensePerCategory,
    totalExpenses: number
  ) => {},
  fetchOrganizationData: (employerRefId: number) => {}
});

export const DashboardContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [dataCacheMap, setDataCacheMap] = React.useState<
    Map<string, Record<string, any>[]>
  >(new Map());

  const [organization, setOrganization] = React.useState<Organization | null>(
    null
  );

  const authCtx = React.useContext(AuthContext);
  const { user, token } = authCtx;

  const { sendHttpRequest: fetchCategories } = useHttp();
  const { sendHttpRequest: fetchMerchants } = useHttp();

  const reqOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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
        .sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        })
        .concat({
          id: -1,
          merchantName: 'Other'
        } as Merchant)
        .map((merchant) => ({
          ...merchant,
          value: merchant.id + '',
          label: merchant.merchantName
          // categoryList: sortListByIdAsc(merchant.categoryList) // causes error when list is undefined
        }));
      newState.set('merchants', mappedMerchants);
      return newState;
    });
  };

  const computeCategoryExpenses = React.useCallback(
    (expPerCategory: ExpensePerCategory, totalExpenses: number) => {
      let categories = dataCacheMap.get('categories');

      if (!categories) {
        return;
      }

      for (const key of Object.keys(expPerCategory)) {
        const categoryIndex = categories.findIndex(
          (cat) =>
            cat.categoryName.trim() ===
            CategoryName[key as keyof typeof CategoryName]
        );
        if (categoryIndex === -1) {
          continue;
        }
        categories[categoryIndex].expensePercent =
          (expPerCategory[key as keyof typeof expPerCategory] / totalExpenses) *
          100;
      }

      setDataCacheMap((prevState) => {
        const newState = new Map(prevState);
        newState.set('categories', categories as Record<string, any>[]);
        return newState;
      });
    },
    [dataCacheMap]
  );

  const {
    loading: fetchingOrg,
    error: errorGettingOrg,
    sendHttpRequest: getOrganization
  } = useHttp();
  
  const fetchOrganizationData = React.useCallback(
    (employerRefId: number) => {
      getOrganization(
        getURLWithQueryParams(
          process.env.REACT_APP_API_BASE_URL + 'employer/dashboard/employer',
          {
            employerRefId: employerRefId.toString()
          }
        ),
        {
          method: 'GET'
        },
        (response: HttpResponse<Organization>) => {
          setOrganization(response.data);
        }
      );
    },
    [getOrganization]
  );

  // React.useEffect(() => {
  //   if (errorGettingOrg) {
  //     setCompleted(false);
  //     pushNotification({
  //       type: 'error',
  //       message: errorGettingOrg.message
  //     });
  //   }
  // }, [errorGettingOrg]);

  // if (errorGettingOrg) {
    // return (
    //   <Box
    //     display="flex"
    //     justifyContent="center"
    //     alignItems="center"
    //     minHeight="80vh">
    //     <Typography variant="body1" align="center" fontSize="1.5rem">
    //       An unexpected error occured
    //     </Typography>
    //   </Box>
    // );
  // }

  const contextValue: DashboardCtxType = {
    staticDataCacheMap: dataCacheMap,
    computeCategoryExpenses,
    organization,
    fetchOrganizationData
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {/* {error && <Notification type="error" message={error.message} />} */}
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
