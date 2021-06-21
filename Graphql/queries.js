import { gql } from "@apollo/client";

export const GET_SHARED_USER_PROFILE = gql`
  query profileCreationScreen($id: String!) {
    profile(id: $id) {
      profileCreationScreen
    }
  }
`;
