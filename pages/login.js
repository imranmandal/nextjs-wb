import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/Signup.module.css";
import modalStyle from "@/styles/Modal.module.css";
import loginFormStyle from "@/styles/Login.module.css";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import AuthContext from "context/AuthContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import Link from "next/link";
import * as yup from "yup";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [pageLoading, setPageLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    router.prefetch("/profile-creation");
  }, []);

  useEffect(() => {
    if (router.query.phone) {
      setPhone(router.query.phone);
      setValue("phone", router.query.phone, {
        shouldValidate: true,
      });
    }
  }, [router.query.phone]);

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

  const handleLogin = async () => {
    setPageLoading(true);

    if (phone.length < 8) {
      toast.error("Please check the phone number");
      setPageLoading(false);
      return;
    }

    const response = await login({ phone, countryCode, password });

    if (response) {
      setPageLoading(false);

      router.push(
        `/profile-creation/?token=${response.token}`,
        `/profile-creation`,
        { shallow: false }
      );
    } else {
      setPageLoading(false);
      console.log(response);
    }
  };

  const handlePhoneChange = (value) => {
    setValue("phone", value);
    setPhone((prevValue) => {
      if (value.length === 19) {
        return prevValue;
      }
      return value;
    });
  };

  return (
    <>
      <div className="container my-4 mx-auto text-left">
        <div className={loginFormStyle.containerInner}>
          <form
            className={styles.login}
            onSubmit={handleSubmit(handleLogin)}
            noValidate
            autoComplete="off"
          >
            {/* For autoComplete */}
            <input
              type="text"
              id="disabled"
              name="disabled"
              className="form-control"
              placeholder="First Name"
              autoComplete="new-off"
              // disabled={isFirstScreenSaved}
              style={{ display: "none" }}
            />

            <h2 className="text-center p-3 text-pink">Sign in</h2>

            <div className="w-100">
              <div className="d-flex flex-column my-3 w-100">
                <div className={styles.phoneInput}>
                  <IntlTelInput
                    preferredCountries={["in"]}
                    onlyCountries={["in", "us", "gb", "ca"]}
                    fieldName="phone"
                    placeholder="Phone"
                    value={phone}
                    onPhoneNumberChange={(isMaxDigit, phone) => {
                      handlePhoneChange(phone);
                    }}
                    onSelectFlag={(index, countryData) => {
                      setCountryCode(countryData.dialCode);
                    }}
                    formatOnInit={false}
                    containerClassName="intl-tel-input w-100 tel-input"
                    inputClassName="form-control w-100"
                    autoComplete="off"
                  />
                </div>

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

              <div className="d-flex flex-column my-3 align-items-center">
                <Link
                  href={{
                    pathname: "/recovery",
                    query: { phone: phone || "" },
                    as: "/recovery",
                  }}
                >
                  <a className={styles.forgotPassTxt}>
                    Forgot{" "}
                    <span className="text-lowercase">your password? </span>
                  </a>
                </Link>
                <input
                  type="submit"
                  value="Sign In"
                  className="btn btn-pink w-100 my-3"
                />

                <p className="my-2 text-center">
                  Don't have an account?{" "}
                  <Link
                    href={{
                      pathname: "/signup",
                      query: { phone: phone || "" },
                    }}
                    as="/signup"
                  >
                    <a className="text-pink ">Sign up</a>
                  </Link>
                </p>
                <Link href="/">
                  <a className="text-pink">
                    <AiOutlineDoubleLeft />
                    Go back home
                  </a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      {pageLoading && (
        <div className={modalStyle.loading_container}>
          <div className="spinner-border text-pink m-auto" role="status">
            <span className="visually-hidden h-100 w-100"></span>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
