import { cookies } from 'next/headers';

/* eslint-disable prettier/prettier */
const init = () => {
  alert('in push');
  const defaultId = document.getElementById('default-id');
  if (defaultId) {
    alert('in defaultId');
    defaultId.onclick = async function () {
      const fn = document.getElementById('field-name-notsure');
      if (fn) {
        alert('test');
        fn.value = 'a new test';
        // fetch("https://www.google.com/", { mode: 'no-cors' });
        // const response = await fetch('https://yfjqz30vcg.execute-api.us-east-2.amazonaws.com/default/bq_login', {
        //   mode: 'cors',
        //   method: 'POST',
        //   body: JSON.stringify({
        //     'user_name': 'e.fisher@computer.org',
        //     'password': 'pz8882Visa!',
        //   }),
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Access-Control-Allow-Origin': '*',
        //   },
        // });

        // const test = await response.json();
        // cookies().set("accessToken", 'money');

        const response = await fetch('https://wwustb5fyk.execute-api.us-east-2.amazonaws.com/qa', {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Origin': '*',
          },
        });

        const test = await response.text();
        cookies().set("accessToken", test);

        // fetch('https://yfjqz30vcg.execute-api.us-east-2.amazonaws.com/default/bq_login', {
        //   mode: 'no-cors',
        //   method: 'POST',
        //   body: JSON.stringify({
        //     'user_name': 'e.fisher@computer.org',
        //     'password': 'pz8882Visa!',
        //   }),
        //   headers: {
        //     'Content-type': 'application/json',
        //     'Access-Control-Allow-Origin': '*',
        //   },
        // })
        //   .then((response) => response.json())
        //   .then((responseJson) => { alert(responseJson); });
        // .then((response) => {
        //   if (!response.ok) {
        //     throw new Error(`HTTP error! Status: ${response.status}`);
        //   } else {
        //     alert(response.statusText);
        //   }
        //   return response;
        // })
        // .then((data) => {
        //   alert('Response data: ' + data);
        // })
        // .catch((error) => {
        //   alert('Fetch error: ' + error);
        // });
      }
    };
  }
};

window.Webflow ||= [];
window.Webflow.push(init);

init();

// <script>document.getElementById('default-id').onclick = function() { document.getElementById('fieldName').value = 'clicked'; }</script>
