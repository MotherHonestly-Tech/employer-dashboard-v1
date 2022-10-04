import React from 'react';

export type WalletCtxShape = {};

const WalletContext = React.createContext<WalletCtxShape>({});

export const WalletContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const contextValue: WalletCtxShape = {};

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
