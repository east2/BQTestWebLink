/* eslint-disable no-console */
import { getPublishDate } from '@finsweet/ts-utils';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

import UserPool from './UserPool';

/**
 * Greets the user by printing a message in the console.
 * @param name The user's name.
 */
export const signIn = (name: string) => {
  // const user = new CognitoUser({
  //   Username: name,
  //   Pool: UserPool,
  // });

  const publishDate = getPublishDate();

  console.log(`Hello ${name}!`);
  console.log(
    `This site was last published on ${publishDate?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    })}.`
  );
};
