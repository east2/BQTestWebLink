import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

import UserPool from './UserPool';

export function SignUp(email, password) {
  UserPool.signUp(email, password, [], null, (err, data) => {
    if (err) {
      alert(err);
    } else {
      alert('confirmed: ' + data.userConfirmed.valueOf());
    }
  });
}

export function SignIn(email, password) {
  const user = new CognitoUser({
    Username: email,
    Pool: UserPool,
  });

  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  return user.authenticateUser(authDetails, {
    onSuccess: (data) => {
      alert(
        'token issued at ' +
          getDate(data.getAccessToken().getIssuedAt()) +
          '\nexpires at ' +
          getDate(data.getAccessToken().getExpiration())
      );
      return false;
    },
    onFailure: (data) => {
      alert(data);
      return false;
    },
    newPasswordRequired: (data) => {
      alert(data);
      return true;
    },
  });
}

export function SignOut() {
  const user = UserPool.getCurrentUser();
  if (user) {
    // alert("Signing out.");
    user.signOut();
  } else {
    // alert("Not signed in.");
  }
}

export function Verify() {
  const user = UserPool.getCurrentUser();
  if (user) {
    user.getSession((err, session) => {
      if (err) {
        // alert("session failed.");
      } else {
        // alert("session secceeded.");
      }
    });
  } else {
    // alert("not logged in.");
  }
}

function getDate(x) {
  const myDate = new Date(x * 1000);
  return myDate.toLocaleString();
}
