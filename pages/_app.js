// bootstrap css
import ApolloProviderContainer from "apollo-client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from "context/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ApolloProviderContainer>
        <Component {...pageProps} />
      </ApolloProviderContainer>
    </AuthProvider>
  );
}

export default MyApp;
