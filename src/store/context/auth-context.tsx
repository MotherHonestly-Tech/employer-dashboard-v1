import * as React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { HttpResponse } from '../../models/api.interface';

import { Employee, Token, User } from '../../models/user.model';
import { decrypt, encrypt } from '../../utils/utils';

const AUTH_LOCATION = 'Sn61y6yYDiIxkur0JT';
const TOKEN_VALIDITY = 720 * 60000;
let expirationTimer: any;

type StoredToken = {
  token: Token;
  tokenExpirationDate: Date | string;
  uuid: number;
};

type AuthContextType = {
  isAuthenticated: boolean;
  token: Token | null;
  userId: number | null;
  user: User | null;
  isOnboarded: (user: User) => boolean;
  login: (token: Token, uuid: number) => void;
  logout: () => void;
  synchronizeUser: (emp: Employee) => void;
  updateUserData: (updatedUser: {
    firstName: string;
    lastName: string;
  }) => void;
};

const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  userId: null,
  user: null,
  isOnboarded: (user: User) => false,
  login: (token: Token, uuid: number) => {},
  logout: () => {},
  synchronizeUser: (emp: Employee) => {},
  updateUserData: ({ firstName, lastName }) => {}
});

const computeExpirationInMilliSecs = (expirationTime: Date) => {
  const currentTimeStamp = new Date().getTime();
  const expirationTimeStamp = new Date(expirationTime).getTime();
  //   currentTimeStamp + TOKEN_VALIDITY

  const remainingTime = expirationTimeStamp - currentTimeStamp;
  return remainingTime;
};

const retrieveStoredToken = () => {
  const encStoredToken: string = localStorage.getItem(AUTH_LOCATION) as string;

  if (!encStoredToken) {
    return null;
  }

  const storedToken: StoredToken = JSON.parse(decrypt(encStoredToken));

  const expirationTimeInMilliSecs = computeExpirationInMilliSecs(
    storedToken.tokenExpirationDate as Date
  );

  if (expirationTimeInMilliSecs <= 60000) {
    localStorage.removeItem(AUTH_LOCATION);
    return null;
  }

  return storedToken;
};

export const AuthContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const tokenData = retrieveStoredToken();
  let initialToken = !!tokenData ? tokenData.token : null;
  let initialUserId = !!tokenData ? tokenData.uuid : null;

  const [token, setToken] = React.useState<Token | null>(initialToken);
  const [userId, setUserId] = React.useState<number | null>(initialUserId);
  const [user, setUser] = React.useState<User | null>(null);

  const history = useHistory();

  const { sendHttpRequest: logout } = useHttp();
  const { sendHttpRequest: resetToken } = useHttp();

  const logoutHandler = React.useCallback(() => {
    setToken(null);
    setUser(null);

    if (expirationTimer) {
      clearTimeout(expirationTimer);
    }
    localStorage.removeItem(AUTH_LOCATION);
    history.replace('/auth/sign-in');

    logout(
      process.env.REACT_APP_API_BASE_URL + 'employee/dashboard/logout',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uuid: user?.uuid
        })
      },
      () => {}
    );
  }, [user, logout]);

  const loginHandler = (token: Token, uuid: number) => {
    setToken(token);
    setUserId(uuid);
    const expirationTime = new Date(new Date().getTime() + TOKEN_VALIDITY);
    setExpirationTimer(expirationTime);

    const storedToken: StoredToken = {
      token,
      tokenExpirationDate: expirationTime,
      uuid
    };

    localStorage.setItem(AUTH_LOCATION, encrypt(JSON.stringify(storedToken)));
  };

  const setExpirationTimer = React.useCallback(
    (expirationTime: Date) => {
      if (tokenData)
        expirationTimer = setTimeout(() => {
          logoutHandler();
        }, computeExpirationInMilliSecs(expirationTime));
    },
    [logoutHandler, tokenData]
  );

  React.useEffect(() => {
    setExpirationTimer(tokenData?.tokenExpirationDate as Date);
  }, [tokenData, setExpirationTimer]);

  const generateNewToken = React.useCallback(
    (refreshToken: string) => {
      resetToken(
        process.env.REACT_APP_API_BASE_URL + 'auth/token/new',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.refreshToken}`
          }
        },
        (responseData: HttpResponse<Token>) => {
          console.log(responseData);
        }
      );
    },
    [resetToken, token]
  );

  const synchronizeUser = React.useCallback(
    (responseData: Employee) => {
      const { firstName, lastName, employeeEmail } = responseData;
      const user = new User(
        Number(userId),
        firstName,
        lastName,
        employeeEmail,
        tokenData?.token as Token,
        tokenData?.tokenExpirationDate as Date
      );
      setUser(user);
    },
    [tokenData, userId]
  );

  const updateUserData = React.useCallback(
    ({ firstName, lastName }: { firstName: string; lastName: string }) => {
      const { email } = user as User;
      const updatedUser = new User(
        Number(userId),
        firstName,
        lastName,
        email,
        tokenData?.token as Token,
        tokenData?.tokenExpirationDate as Date
      );
      setUser(updatedUser);
    },
    [tokenData, userId, user]
  );

  const contextValue: AuthContextType = {
    token: token,
    isAuthenticated: !!token,
    userId: userId,
    user: user,
    isOnboarded: (user: User) => !!(user?.firstName && user?.lastName),
    login: loginHandler,
    logout: logoutHandler,
    synchronizeUser,
    updateUserData
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
