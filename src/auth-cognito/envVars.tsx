export const getClientId = () => {
  return process.env.NEXT_PUBLIC_CLIENT_ID;
};

export const getAppHost = () => {
  const appHost = process.env.NEXT_PUBLIC_APP_HOST;
  if (appHost) {
    return appHost;
  }

  return '';
};

export const getCognitoAddress = () => {
  const cognitoAddress = process.env.NEXT_PUBLIC_COGNITO_ADDRESS;
  if (cognitoAddress) {
    return cognitoAddress;
  }

  return '';
};

export const getSignInRedirect = () => {
  const signInRedirect = process.env.NEXT_PUBLIC_SIGNIN_REDIRECT;
  if (signInRedirect) {
    return signInRedirect;
  }

  return '';
};

export const getSignOutRedirect = () => {
  const signOutRedirect = process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT;
  if (signOutRedirect) {
    return signOutRedirect;
  }

  return '';
};
