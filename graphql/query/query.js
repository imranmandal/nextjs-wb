import { gql } from "@apollo/client";

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
      values {
        id
        name
      }
    }
  }
`;

export const GET_EMPLOYER_NAME = gql`
  query employers($like: String, $skip: Int, $take: Int) {
    employers(
      options: { q: $like, skip: $skip, take: $take, isApproved: { eq: true } }
    ) {
      values {
        id
        name
      }
    }
  }
`;

export const GET_PROFILE_CREATION_SCREEN = gql`
  query profileCreationPage($id: String!) {
    profile(id: $id) {
      profileCreationScreen
    }
  }
`;

export const GET_FIRST_SCREEN = gql`
  query User($id: String!) {
    user(id: $id) {
      phone
      email
      profile {
        profileManagedBy
        firstName
        lastName
        gender
        dob
        maritalStatus
        motherTongue
        socialDetails {
          religion
        }
        otherProfileDetails {
          height
          disabilities
          majorDiseases
          diet
          smoke
          drink
        }
        city {
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
  }
`;

export const GET_SECOND_SCREEN = gql`
  query User($id: String!) {
    professionalDetails(id: $id) {
      designation {
        id
        name
      }
      degrees
      occupation
      employer {
        id
        name
      }
      employedIn
      annualIncome
    }
  }
`;
