// ./apollo-client.js
import { API_URL } from "@/config/index";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { useContext } from "react";
import AuthContext from "context/AuthContext";

const ApolloProviderContainer = ({ children }) => {
  const { userToken } = useContext(AuthContext);

  // Apollo client setup
  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => {
        alert(`Graphql error ${message}`);
      });
    }
  });

  const link = from([errorLink, new HttpLink({ uri: `${API_URL}/graphql` })]);

  const authLink = setContext(() => {
    return {
      headers: {
        Authorization: `Bearer ${userToken ? userToken : ""}`,
      },
    };
  });

  const httpAuthLink = authLink.concat(link);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpAuthLink,
  });
  // -----------Apollo setup end

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderContainer;
