import gql from 'graphql-tag';

export const ClientsQuery = gql`
  query ClientsQuery {
    allClients {
      id,
      name,
      number,
      email,
      companySender {
        id,
        name
      }
    }
  }
`;
