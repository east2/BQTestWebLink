'use client';

import {
  AuthenticationDetails,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoUser,
  CognitoUserSession,
  ICognitoUserSessionData,
} from 'amazon-cognito-identity-js';
import { useRouter } from 'next/navigation';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import React from 'react';

import { getSignInRedirect } from './envVars';
import UserPool from './UserPool';

type CognitoData = {
  cdSession: CognitoUserSession;
};

interface ContextProps {
  isSignedIn: boolean;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  verification: string;
  setVerification: Dispatch<SetStateAction<string>>;
  idToken: string;
  setIdToken: Dispatch<SetStateAction<string>>;
  session: CognitoData[];
  setSession: Dispatch<SetStateAction<CognitoData[]>>;
  getLoggedIn: Dispatch<SetStateAction<boolean>>;
  signIn: Dispatch<SetStateAction<boolean>>;
  signOut: Dispatch<SetStateAction<boolean>>;
  signUp: Dispatch<SetStateAction<boolean>>;
  confirmRegistration: Dispatch<SetStateAction<boolean>>;
  setIsSocial: Dispatch<SetStateAction<boolean>>;
}

const CognitoContext = createContext<ContextProps>({
  isSignedIn: false,
  setIsSignedIn: (): boolean => false,
  setIsSocial: (): boolean => false,
  email: '',
  setEmail: (): string => '',
  password: '',
  setPassword: (): string => '',
  idToken: '',
  setIdToken: (): string => '',
  verification: '',
  setVerification: (): string => '',
  session: [],
  setSession: (): CognitoData[] => [],
  getLoggedIn: (): boolean => false,
  signIn: (): boolean => false,
  signOut: (): boolean => false,
  signUp: (): boolean => false,
  confirmRegistration: (): boolean => false,
});

export const CognitoContextProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verification, setVerification] = useState('');
  const [idToken, setIdToken] = useState('');
  const [session, setSession] = useState<[] | CognitoData[]>([]);
  const router = useRouter();

  async function getLoggedIn() {
    const social = UserPool.getIsSocial();
    if (social) {
      setIsSignedIn(UserPool.getIsSignedIn());
    } else {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err: any, session: any) => {
          if (err) {
            setIsSignedIn(false);
            setSession([]);
          } else {
            setIsSignedIn(true);
            setSession([session]);
          }
        });
      } else {
        setIsSignedIn(false);
        setSession([]);
      }
    }
  }

  function getDate(x: number) {
    const myDate = new Date(x * 1000);
    return myDate.toLocaleString();
  }

  async function signUp() {
    UserPool.signUp(email, password, [], [], (err, data) => {
      if (err) {
        alert(err);
      } else if (data) {
        router.push('/email-sent');
      }
    });
  }

  async function signIn() {
    const social = UserPool.getIsSocial();

    if (social) {
      const cidT = new CognitoIdToken({ IdToken: UserPool.getIdToken() });
      const cat = new CognitoAccessToken({ AccessToken: '' });
      const cus = new CognitoUserSession({ IdToken: cidT, AccessToken: cat });
      setSession([{ cdSession: cus }]);
      UserPool.setIsSignedIn(true);
      setIsSignedIn(true);
    } else {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          setIsSignedIn(true);
          setSession([{ cdSession: data }]);
          router.push(getSignInRedirect());
        },
        onFailure: (data) => {
          setIsSignedIn(false);
          setSession([]);
          alert(data);
        },
        newPasswordRequired: (data) => {
          setIsSignedIn(true);
          setSession([{ cdSession: data }]);
          alert(data);
        },
      });
    }
  }

  async function confirmRegistration() {
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.confirmRegistration(verification, true, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
      } else {
        router.push('/signin');
      }
    });
  }

  async function setIsSocial() {
    UserPool.setIsSocial(true);
  }

  async function signOut() {
    const social = UserPool.getIsSocial();
    if (social) {
      UserPool.clearTokens();
      setIsSignedIn(false);
      setSession([]);
    } else {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.signOut();
        setIsSignedIn(false);
        setSession([]);
      } else {
        setIsSignedIn(false);
        setSession([]);
      }
    }
  }

  return (
    <CognitoContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
        setIsSocial,
        email,
        setEmail,
        password,
        setPassword,
        verification,
        idToken,
        setIdToken,
        setVerification,
        getLoggedIn,
        signIn,
        signOut,
        signUp,
        confirmRegistration,
      }}
    >
      {children}
    </CognitoContext.Provider>
  );
};

export const useCognitoContext = () => useContext(CognitoContext);
