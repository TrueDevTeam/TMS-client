import gql from 'graphql-tag';

export const InsertDriverQuery = gql`
  mutation InsertDriverQuery($driver: InsertionDriverInput!) {
    insertDriver(driver: $driver) {
      id,
      fullName,
      birthday,
      taxpayerId,
      region,
      imageUrl
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
