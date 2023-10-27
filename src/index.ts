import { selectInputElement } from '@finsweet/ts-utils';

import { greetUser } from '$utils/greet';

window.Webflow ||= [];
window.Webflow.push(() => {
  const defaultId = document.getElementById('default-id');
  if (defaultId) {
    defaultId.onclick = function () {
      const fn = document.getElementById('fieldName');
      if (fn) {
        (<HTMLInputElement>fn).value = 'This is on my machine.';
      }
    };
  }
});

// <script>document.getElementById('default-id').onclick = function() { document.getElementById('fieldName').value = 'clicked'; }</script>
