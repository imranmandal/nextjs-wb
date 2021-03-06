import { NEXT_URL, API_URL } from "@/config/index";
import axios from "node_modules/axios/index";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [uuId, setUuId] = useState(null);
  const [error, setError] = useState(null);
  const [serverLoading, setServerLoading] = useState(true);

  useEffect(() => {
    checkUserLoggedIn();
    createUuid();
  }, []);

  const router = useRouter();

  //   Login User
  const login = async ({ phone, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: `+${phone}`,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUserToken(data.token);
      return data;
    } else {
      setError(data.message);
      setError(null);
    }
  };

  //   Sign up user
  const signUp = async ({
    email,
    phone,
    otp,
    countryCode,
    password,
    userSource,
    deviceInfo,
    phoneAuthToken,
  }) => {
    // const phoneAuthToken = localStorage.getItem("phoneAuthToken");
    const res = await axios
      .post(`${NEXT_URL}/api/signup`, {
        email: email,
        phone: `+${phone}`,
        iso: countryCode,
        otp: `${otp}`,
        password: password,
        appLanguage: 1,
        phoneAuthToken: phoneAuthToken,
        userSource: userSource,
        deviceInfo: deviceInfo,
      })
      .then((res) => {
        router.push(
          `/profile-creation/?token=${res.data.accessToken}`,
          `/profile-creation`,
          { shallow: false }
        );
        setUserToken(res.data.accessToken);
        return res;
      })
      .catch((error) => {
        // console.log(error.response);
        return error.response;
      });

    return res;
  };

  //   Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUserToken(null);
      setUuId(null);
      router.replace("/", undefined, { shallow: false });
    }
  };

  //   Check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`, {
      method: "GET",
    });
    const data = await res.json();

    if (res.ok) {
      // token exist
      setUserToken(data.token);
      setServerLoading(false);
    } else {
      // token expired
      const logoutRes = await fetch(`${NEXT_URL}/api/logout`, {
        method: "POST",
      });

      if (logoutRes.ok) {
        setUserToken(null);
        setServerLoading(false);
      } else {
        setServerLoading(false);
      }
    }
  };

  //  Create and Save new uuid
  const createUuid = async () => {
    const status = await checkUuidExist();
    if (status) {
      return;
    }

    const uuid = uuidv4();
    axios
      .post(`${NEXT_URL}/api/createUuid`, {
        uuid: uuid,
      })
      .then((res) => {
        setUuId(res.data.uuid);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkUuidExist = async () => {
    const res = await fetch(`${NEXT_URL}/api/userId`, {
      method: "GET",
    });

    const data = await res.json();
    if (res.ok) {
      setUuId(data.uuid);
      return true;
    } else {
      setUuId(null);
      return false;
    }
  };

  //------------- Apollo client setup
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

  return (
    <AuthContext.Provider
      value={{
        userToken,
        uuId,
        error,
        serverLoading,
        login,
        signUp,
        logout,
        createUuid,
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AuthContext.Provider>
  );
};

export default AuthContext;
