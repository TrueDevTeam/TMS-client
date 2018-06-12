import gql from 'graphql-tag';

export const InsertCarQuery = gql`
  mutation InsertCarQuery($car: InsertionCarInput!) {
    insertCar(car: $car) {
      id,
      brand,
      model,
      carryingCapacity,
      cargoType,
      fuelConsumption,
      stateNumber
    }
  }
`;

export const CarQuery = gql`
  query CarQuery($id: Int!) {
    car(id: $id) {
      id,
      brand,
      model,
      carryingCapacity,
      cargoType,
      fuelConsumption,
      stateNumber
    }
  }
`;
