import { gql } from "graphql-request";

export const CLIENT_QUERY = gql`
  query clientQuery {
    client {
      id
      email
      fullName
      address {
        id
        streetNumber
        streetName
        suburbName
        cityName
        provinceName
        areaCode
        latitude
        longitude
      }
    }
  }
`;