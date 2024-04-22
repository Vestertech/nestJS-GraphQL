import gql from 'graphql-tag';

export const createUserMutation = gql`
  mutation {
    createUser(
      createUserData: { username: "sylvester", displayName: "Sylvester" }
    ) {
      id
      username
      displayName
    }
  }
`;

export const getUsersQuery = gql`
  {
    getUsers {
      id
      username
      displayName
    }
  }
`;
