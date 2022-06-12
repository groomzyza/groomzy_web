import { gql } from "graphql-request";

export const EDIT_SERVICE_MUTATION = gql`
  mutation editServiceMutation(
    $serviceId: Int!
    $category: String
    $title: String
    $description: String
    $duration: Float
    $durationUnit: String
    $price: Float
    $inHouse: Boolean
  ) {
    editService(
      serviceId: $serviceId
      category: $category
      title: $title
      description: $description
      duration: $duration
      durationUnit: $durationUnit
      price: $price
      inHouse: $inHouse
    ) {
      message {
        message
      }
      service {
        id
        description
        duration
        durationUnit
        inHouse
        price
        title
        serviceProviderCategories {
          category {
            id
            category
          }
        }
      }
    }
  }
`;
