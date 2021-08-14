import { gql } from "@apollo/client";

export const SAVE_FIRST_PAGE = gql`
  mutation saveFirstScreen(
    $firstName: String!
    $lastName: String!
    $gender: Gender!
    $dob: DateTime!
    $motherTongue: Language!
    $maritalStatus: MaritalStatus!
    $city: Int!
    $userId: String!
    $profileManagedBy: ProfileManagedBy!
    $religion: Religion!
    $height: Int!
    $disabilities: [Disability!]!
    $majorDiseases: [MajorDisease!]!
    $diet: DietaryChoice!
    $smoke: Boolean!
    $drink: Boolean!
  ) {
    saveFirstScreen(
      firstScreenInput: {
        firstName: $firstName
        lastName: $lastName
        gender: $gender
        dob: $dob
        motherTongue: $motherTongue
        maritalStatus: $maritalStatus
        cityId: $city
        userId: $userId
        profileManagedBy: $profileManagedBy
        religion: $religion
        height: $height
        disabilities: $disabilities
        majorDiseases: $majorDiseases
        diet: $diet
        smoke: $smoke
        drink: $drink
      }
    ) {
      id
    }
  }
`;

export const SAVE_SECOND_SCREEN = gql`
  mutation saveSecondScreen(
    $id: String!
    $degrees: [ActualDegree!]
    $employedIn: EmployedIn!
    $occupation: Occupation!
    $employerName: String
    $designationName: String
    $annualIncome: AnnualIncome!
  ) {
    saveSecondScreen(
      professionalDetailsInput: {
        id: $id
        degrees: $degrees
        employedIn: $employedIn
        occupation: $occupation
        employerName: $employerName
        designationName: $designationName
        annualIncome: $annualIncome
      }
    ) {
      id
    }
  }
`;
