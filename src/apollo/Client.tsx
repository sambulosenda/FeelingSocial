import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';

import { AuthOptions, AUTH_TYPE, createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

import config from '../aws-exports';
import { useAuthContext } from '../contexts/AuthContext';

interface IClient {
  children: React.ReactNode;
}

const url = config.aws_appsync_graphqlEndpoint;
const region = config.aws_appsync_region;

const httpLink = createHttpLink({ uri: url });

const Client = ({ children }: IClient) => {
  const { user } = useAuthContext();
  const jwtToken = user?.getSignInUserSession()?.getAccessToken().getJwtToken() || '';

  const auth: AuthOptions = {
    type: config.aws_appsync_authenticationType as AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken,
  };

  const link = ApolloLink.from([
    createAuthLink({ url, region, auth }),
    createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
  ]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default Client;
