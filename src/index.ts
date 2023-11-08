import { cookies } from 'next/headers';

/* eslint-disable prettier/prettier */
const init = () => {
  // alert('in push');
  const defaultId = document.getElementById('default-id');
  if (defaultId) {
    // alert('in defaultId');
    defaultId.onclick = async function () {
      const userNameCtrl = document.getElementById('field-name-notsure');
      const passwordCtrl = document.getElementById('password-field');
      if (userNameCtrl && passwordCtrl) {
        // alert('test');
        const userName: string = userNameCtrl.value;
        const passwordString: string = passwordCtrl.value;

        const response = await fetch('https://wwustb5fyk.execute-api.us-east-2.amazonaws.com/qa', {
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify({
            'user_name': userName,
            'password': passwordString,
          }),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Origin': '*',
          },
        });

        const test = await response.json();
        cookies().set("accessToken", test);
      }
    };
  }
};

window.Webflow ||= [];
window.Webflow.push(init);
