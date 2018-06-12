import gql from 'graphql-tag';

export const InsertProductsQuery = gql`
  mutation InsertProductsQuery($products: [InsertionProductInput]!) {
    insertProducts(products: $products) {
      _id,
      name,
      abbr,
      group {
        _id,
        name
      },
      color,
      measure,
      price {
        value,
        currency
      },
      tax,
      sku,
      client {
        name
      }
    }
  }
`;
