import React from 'react';
import { useLocation } from 'react-router-dom';

import useHttp from '../hooks/use-http';
import { HttpResponse } from '../models/api.interface';
import { LinkSuccessMetadata } from '../models/plaid.model';

export type PlaidLinkContextShape = {
  isOauth: boolean;
  linkToken: string | null;
  generateLinkToken: () => void;
  exchangePublicToken: (
    publicToken: string,
    metadata: LinkSuccessMetadata,
    userId: number
  ) => void;
  removeLinkToken: () => void;
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
  exchangePublicToken: (
    publicToken: string,
    metadata: LinkSuccessMetadata,
    userId: number
  ) => {},
  removeLinkToken: () => {}
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
    if (isOauth.current) {
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

  const removeLinkToken = React.useCallback(() => {
    localStorage.removeItem('link_token');
  }, []);

  const exchangePublicToken = React.useCallback(
    (publicToken: string, metadata: LinkSuccessMetadata, userId: number) => {
      removeLinkToken();
      sendHttpRequest(
        process.env.REACT_APP_PLAID_API_URL + 'plaid/access/token',
        {
          method: 'POST',
          body: JSON.stringify({
            publicToken,
            accountId: metadata.account_id,
            mask: metadata.account.mask,
            officialName: metadata.account.name,
            customerId: userId
          })
        },
        (response: HttpResponse<string>) => {
          console.log(response);
        }
      );
    },
    [sendHttpRequest, removeLinkToken]
  );

  const contextValue = {
    isOauth: isOauth.current,
    linkToken,
    generateLinkToken,
    exchangePublicToken,
    removeLinkToken
  };

  return (
    <PlaidLinkContext.Provider value={contextValue}>
      {children}
    </PlaidLinkContext.Provider>
  );
};

export default PlaidLinkContext;
