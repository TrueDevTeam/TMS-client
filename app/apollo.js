import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getOperationAST } from 'graphql';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';

const httpUri = 'http://localhost:5000/graphql';
const wsUri = 'ws://localhost:5050/graphql';

const httpLink = new HttpLink({
  uri: httpUri,
});

const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem('token'),
    },
  },
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : '',
    },
  };
});

const logoutLink = onError(({ networkError }) => {
  console.log(networkError);
  if (networkError && (networkError.statusCode === 403)) {
    console.log(networkError.statusCode);
    // localStorage.setItem('token', '');
    // wsLink.subscriptionClient.close(true);
    // apolloClient.resetStore();
    // location.href = '/login';
  }
});

const link = ApolloLink.split(
    (operation) => {
      const operationAST = getOperationAST(operation.query, operation.operationName);
      return !!operationAST && operationAST.operation === 'subscription';
    },
    wsLink,
    // authLink.concat(httpLink),
    from([
      authLink,
      logoutLink,
      httpLink,
    ]),
);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
