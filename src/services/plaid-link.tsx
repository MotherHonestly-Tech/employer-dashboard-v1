import React from 'react';
import { useLocation } from 'react-router-dom';

import useHttp from '../hooks/use-http';
import { HttpResponse } from '../models/api.interface';

export type PlaidLinkContextShape = {
  isOauth: boolean;
  linkToken: string | null;
  generateLinkToken: () => void;
  exchangePublicToken: (publicToken: string, accountId: string) => void;
  //   publicKey: string;
  //   env: 'sandbox' | 'development' | 'production';
  //   product: 'auth' | 'transactions';
  //   onSuccess: (public_token: string, metadata: any) => void;
  //   onExit: (err: any, metadata: any) => void;
  //   onEvent: (eventName: string, metadata: any) => void;
};

const PlaidLinkContext = React.createContext<PlaidLinkContextShape>({
  isOauth: false,
  linkToken: null,
  generateLinkToken: () => {},
  exchangePublicToken: (publicToken: string, accountId: string) => {}
  //   publicKey: '',
  //   env: 'sandbox',
  //   product: 'auth',
  //   onSuccess: (public_token: string, metadata: any) => {},
  //   onExit: (err: any, metadata: any) => {},
  //   onEvent: (eventName: string, metadata: any) => {}
});

export const PlaidLinkContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const queryParams = React.useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const [linkToken, setLinkToken] = React.useState<string | null>(null);
  const isOauth = React.useRef<boolean>(!!queryParams.get('oauth_state_id'));

  const { loading, error, sendHttpRequest } = useHttp();

  const generateLinkToken = React.useCallback(() => {
    if (isOauth) {
      setLinkToken(localStorage.getItem('link_token'));
    } else {
      sendHttpRequest(
        process.env.REACT_APP_PLAID_API_URL + 'plaid/link/token',
        {
          method: 'GET'
        },
        (response: HttpResponse<string>) => {
          // console.log(response);
          setLinkToken(response.data);
          localStorage.setItem('link_token', response.data); //to use later for Oauth
        }
      );
    }
  }, [sendHttpRequest, isOauth]);

  const exchangePublicToken = React.useCallback((publicToken: string, accountId: string) => {
    sendHttpRequest(
      process.env.REACT_APP_PLAID_API_URL + 'plaid/access/token',
      {
        method: 'POST',
        body: JSON.stringify({
          publicToken,
          accountId
        })
      },
      (response: HttpResponse<string>) => {
        console.log(response);
      }
    );
  }, [sendHttpRequest]);

  const contextValue = {
    isOauth: isOauth.current,
    linkToken,
    generateLinkToken,
    exchangePublicToken
  };

  return (
    <PlaidLinkContext.Provider value={contextValue}>
      {children}
    </PlaidLinkContext.Provider>
  );
};

export default PlaidLinkContext;
