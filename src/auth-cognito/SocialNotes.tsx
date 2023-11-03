import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';

export default class SocialNotes extends CognitoUserPool {
  getIsSocial() {
    const cookieExists = hasCookie('social');
    if (cookieExists) {
      const social: boolean = getCookie('social') == 'true';
      return social;
    }
    return false;
  }
  setIsSocial(isSocial: boolean) {
    const socialStr: string = isSocial ? 'true' : 'false';
    setCookie('social', socialStr, { maxAge: 60 * 60 * 24 });
  }

  getIsSignedIn() {
    const cookieExists = hasCookie('signedin');
    if (cookieExists) {
      const signedin: boolean = getCookie('signedin') == 'true';
      return signedin;
    }
    return false;
  }
  setIsSignedIn(isSignedIn: boolean) {
    const signedInStr: string = isSignedIn ? 'true' : 'false';
    setCookie('signedin', signedInStr, { maxAge: 60 * 60 * 24 });
  }

  getIdToken() {
    const cookieExists = hasCookie('idToken');
    if (cookieExists) {
      const idToken: string | undefined = getCookie('idToken')?.toString();
      if (idToken) {
        return idToken;
      }
    }
    return '';
  }

  clearTokens() {
    deleteCookie('signedin');
    deleteCookie('social');
    deleteCookie('accessToken');
    deleteCookie('idToken');
    deleteCookie('refreshToken');
  }
}
