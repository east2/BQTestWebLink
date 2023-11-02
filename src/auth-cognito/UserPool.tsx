import { getClientId } from './envVars';
import SocialNotes from './SocialNotes';

const poolData = {
  UserPoolId: 'us-east-2_wPaTYfXEh',
  ClientId: getClientId(),
};

export default new SocialNotes(poolData);
