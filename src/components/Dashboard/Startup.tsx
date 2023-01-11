import React from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../../store/context/auth-context';
import useHttp from '../../hooks/use-http';
import { getURLWithQueryParams } from '../../utils/utils';
import { Employee } from '../../models/user.model';
import { HttpResponse } from '../../models/api.interface';
import BackdropLoader from '../Loading/BackdropLoader';
import DashboardContext from '../../store/context/dashboard.context';
import { Organization } from '../../models/employer.model';

const Startup = () => {
  const authCtx = React.useContext(AuthContext);
  const dashboardCtx = React.useContext(DashboardContext);
  const { error, sendHttpRequest: getUser } = useHttp();

  const { userId, token, synchronizeUser } = authCtx;
  const { fetchOrganizationData } = dashboardCtx;

  console.log(dashboardCtx);

  const fetchUser = React.useCallback(async () => {
    await getUser(
      getURLWithQueryParams(
        process.env.REACT_APP_API_BASE_URL +
          'employee/dashboard/employee/token/uuid',
        {
          uuid: String(userId)
        }
      ),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token?.accessToken}`
        }
      },
      (response: HttpResponse<Employee>) => {
        fetchOrganizationData(response.data.employerRefId);
        synchronizeUser(response.data);
      }
    );
  }, [userId, token, getUser, synchronizeUser, fetchOrganizationData]);

  React.useEffect(() => {
    fetchUser();
  }, []);

  if (error) {
    return <Redirect to="/auth/sign-in" />;
  }

  return <BackdropLoader />;
};

export default Startup;
