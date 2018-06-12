import gql from 'graphql-tag';

export const DriversQuery = gql`
  query DriversQuery {
    allDrivers {
      id,
      fullName,
      birthday,
      taxpayerId,
      region,
      imageUrl
    }
  }
`;
