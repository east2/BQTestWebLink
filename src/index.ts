// import { selectInputElement } from '@finsweet/ts-utils';
import { CognitoUser } from 'amazon-cognito-identity-js';

import UserPool from '$auth-cognito/UserPool';
// import { signIn } from '$auth-cognito/cognito2';
import { greetUser } from '$utils/greet';

const user = new CognitoUser({
  Username: 'e.fisher@computer.org',
  Pool: UserPool,
});

window.Webflow ||= [];
window.Webflow.push(() => {
  const user = new CognitoUser({
    Username: 'e.fisher@computer.org',
    Pool: UserPool,
  });
  const defaultId = document.getElementById('default-id');
  if (defaultId) {
    defaultId.onclick = function () {
      const fn = document.getElementById('field-name-notsure');
      if (fn) {
        (<HTMLInputElement>fn).value = 'This is on my machine.';
        try {
          alert('in try.');
          throw new Error('too dumb');
          // alert(user.getUsername());
        } catch (error) {
          alert(error.stack);
        }
        // greetUser('user.getUsername()');
        // signIn('e.fisher@computer.org');
      }
    };
  }
});

// <script>document.getElementById('default-id').onclick = function() { document.getElementById('fieldName').value = 'clicked'; }</script>
