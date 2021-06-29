import React, { useContext, useState } from "react";
import styles from "@/styles/Signup.module.css";
import AuthContext from "context/AuthContext";
import { useQuery } from "@apollo/client";
import { GET_PROFILE_CREATION_SCREEN } from "../Graphql/query/query";
import { parseJwt } from "../Profile-creation/ParseJwt";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import * as yup from "yup";

const Login = ({ setPageLoading }) => {
  const { login, userToken } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const uid = parseJwt(userToken);

  const schema = yup.object().shape({
    phone: yup
      .number()
      .typeError("you must specify a number")
      .transform((value) => (isNaN(value) ? undefined : value))
      .positive()
      .integer()
      .min(10, "Phone must be at least 10 digits")
      .required("Phone is required"),

    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be maximum 20 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data, error, loading } = useQuery(GET_PROFILE_CREATION_SCREEN, {
    variables: {
      id: uid,
    },
  });

  const handleLogin = async () => {
    setPageLoading(true);
    const response = await login({ phone, password });

    if (response) {
      setPageLoading(false);
      router.push({
        pathname: "/profile-creation",
        query: {
          currentPage: data?.profile.profileCreationScreen || 1,
        },
      });
    } else {
      setPageLoading(false);
    }
  };

  return (
    <>
      <div className="container my-4 mx-auto text-left">
        <div className="col mx-auto my-5 text-capitalize">
          <form
            className={styles.login}
            action="#"
            onSubmit={handleSubmit(handleLogin)}
          >
            <h2 className="text-center p-3 text-pink">Sign in</h2>

            <div className="my-3 mx-1 mx-sm-3 w-100">
              <div className="d-flex flex-column my-2 w-100">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setValue("phone", e.target.value);
                    setPhone(e.target.value);
                  }}
                  className="form-control"
                  placeholder="Phone"
                />
                <p className="error-message">{errors.phone?.message}</p>
              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setValue("password", e.target.value);
                  setPassword(e.target.value);
                }}
                className="form-control"
                placeholder="Password"
              />
              <p className="error-message">{errors.password?.message}</p>

              <div className="d-flex flex-column">
                <Link href="/recovery">
                  <a>
                    Forgot{" "}
                    <span className="text-lowercase">your password?</span>
                  </a>
                </Link>
                <input
                  type="submit"
                  value="Sign In"
                  className="btn btn-pink w-100 "
                >
                  {/* <span className={styles.submitBtn}>Sign In</span> */}
                </input>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
