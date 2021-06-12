import { NEXT_URL, API_URL } from "@/config/index";
import axios from "node_modules/axios/index";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => checkUserLoggedIn(), [userToken]);

  const router = useRouter();

  //   Register User
  const register = async (user) => {
    console.log(user);
  };

  //   Login user
  const login = async ({ email, phone, otp, password, userSource }) => {
    const phoneAuthToken = localStorage.getItem("phoneAuthToken");

    axios
      .post(`${NEXT_URL}/api/signup`, {
        email: email,
        phone: `${phone}`,
        otp: `${otp}`,
        password: password,
        appLanguage: 1,
        phoneAuthToken: phoneAuthToken,
        userSource: userSource,
      })
      .then((res) => {
        console.log(res);
        router.push("/profile-creation");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   Logout user
  const logout = async () => {
    const res = fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUserToken(null);
      router.push("/");
    }
  };

  //   Check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUserToken(data.token);
    } else {
      setUserToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
