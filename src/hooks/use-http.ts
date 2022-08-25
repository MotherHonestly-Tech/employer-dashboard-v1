import React from 'react';

import { HttpResponse } from '../models/api.interface';
import { HttpStatusCode } from '../models/http-status-codes';
import AuthContext from '../store/context/auth-context';

const useHttp = () => {
  const authCtx = React.useContext(AuthContext);
  const { token } = authCtx;

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<{ message: string } | null>(null);

  const sendHttpRequest = React.useCallback(
    async (
      endpoint: string,
      requestConfig: RequestInit,
      responseHandlerFn: (response: HttpResponse<any>) => void,
      config?: {
        errorMessage: string;
      }
    ) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(endpoint, {
          method: requestConfig.method || 'GET',
          headers: {
            ...(requestConfig.headers || {
              'Content-Type': 'application/json',
            }),
            ...(token ? { Authorization: `Bearer ${token.accessToken}` } : {})
          },
          body: requestConfig.body || null
        });

        // if (!response.ok) {
        //   throw new Error('Response failed!');
        // }

        const responseData = await response.json();

        if (response.status !== HttpStatusCode.Ok) {
          throw new Error(responseData.message);
        }

        responseHandlerFn(responseData);
      } catch (error: any) {
        error instanceof Error && setError({
          message:
            config?.errorMessage || error.message || 'Something went wrong'
        });
      }

      setLoading(false);
    },
    [token]
  );

  return { loading, error, sendHttpRequest };
};

export default useHttp;
