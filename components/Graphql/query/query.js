import { gql } from "@apollo/client";

export const GET_INSTITUTE_NAMES = gql`
  query institutes($like: String, $skip: Int, $take: Int) {
    institutes(
      options: { q: $like, skip: $skip, take: $take, isApproved: { eq: true } }
    ) {
      id
      name
    }
  }
`;

export const GET_CITY_NAME = gql`
  query cities($like: String, $skip: Int, $take: Int) {
    cities(
      options: {
        like: $like
        skip: $skip
        take: $take
        currentCountryName: "india"
      }
    ) {
      values {
        id
        name
        state {
          name
          country {
            name
          }
        }
      }
    }
  }
`;

export const GET_DESIGNATION_NAME = gql`
  query designations($like: String, $skip: Int, $take: Int) {
    designations(
      options: { q: $like, skip: $skip, take: $take, isApproved: { eq: true } }
    ) {
      id
      name
    }
  }
`;

export const GET_EMPLOYER_NAME = gql`
  query employers($like: String, $skip: Int, $take: Int) {
    employers(
      options: { q: $like, skip: $skip, take: $take, isApproved: { eq: true } }
    ) {
      id
      name
    }
  }
`;
