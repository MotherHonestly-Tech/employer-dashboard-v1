import React from 'react';

import useHttp from '../hooks/use-http';
import { HttpResponse } from '../models/api.interface';

import AuthContext from '../store/context/auth-context';

type MergeLinkContextShape = {
  linkToken: string | null;
  generateLinkToken: () => void;
};

const MergeLinkContext = React.createContext<MergeLinkContextShape>({
  linkToken: null,
  generateLinkToken: () => {}
});

export const MergeLinkContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [linkToken, setLinkToken] = React.useState<string | null>(null);

  const authCtx = React.useContext(AuthContext);
  const { user } = authCtx;

  const { loading, error, sendHttpRequest: fetchLinkToken } = useHttp();

  const generateLinkToken = () => {
    if (!user) {
      return;
    }

    fetchLinkToken(
      process.env.REACT_APP_API_BASE_URL +
        'employee/dashboard/merge/linktoken',
      {
        method: 'POST',
        body: JSON.stringify({
          employerRefId: user.employerRefId
        })
      },
      (response: HttpResponse<string>) => {
        setLinkToken(response.data);
      }
    );
  };

  const contextValue: MergeLinkContextShape = {
    linkToken,
    generateLinkToken
  };

  return (
    <MergeLinkContext.Provider value={contextValue}>
      {children}
    </MergeLinkContext.Provider>
  );
};

export default MergeLinkContext;
