import gql from 'graphql-tag';

export const InsertSenderWarehouseQuery = gql`
  mutation InsertSenderWarehouseQuery($warehouse: InsertionWarehouseInput!) {
    insertSendersWarehouse(warehouse: $warehouse) {
      id,
      latitude,
      longitude,
      address,
      title,
      area,
      gatesAmount,
      companySender {
        _id
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
