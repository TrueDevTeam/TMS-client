import gql from 'graphql-tag';

export const CarsQuery = gql`
  query CarsQuery {
    allCars {
      id,
      brand,
      model,
      cargoType,
      carryingCapacity,
      fuelConsumption,
      stateNumber
    }
  }
`;
