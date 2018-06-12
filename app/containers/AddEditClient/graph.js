import gql from 'graphql-tag';

export const InsertClientQuery = gql`
  mutation InsertClientQuery($client: InsertionClientInput!) {
    insertClient(client: $client) {
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

export const ClientQuery = gql`
  query ClientQuery($id: Int!) {
    client(id: $id) {
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
