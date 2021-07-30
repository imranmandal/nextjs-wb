import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/Signup.module.css";
import AuthContext from "context/AuthContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import Link from "next/link";
import * as yup from "yup";

const Login = ({ setPageLoading, queryData, setShowModal }) => {
  const { login } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/profile-creation");
  }, []);

  useEffect(() => {
    if (queryData) {
      console.log(queryData);
      setPhone(queryData);
      setValue("phone", queryData, {
        shouldValidate: true,
      });
    }
  }, [queryData]);

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
      setShowModal(false);

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
        <div className="col mx-auto my-5 text-capitalize">
          <form
            className={styles.login}
            onSubmit={handleSubmit(handleLogin)}
            noValidate
            autoComplete="new-off"
          >
            <h2 className="text-center p-3 text-pink">Sign in</h2>

            <div className="my-3 mx-1 mx-sm-3 w-100">
              <div className="d-flex flex-column my-2 w-100">
                <div className={styles.phoneInput}>
                  <IntlTelInput
                    preferredCountries={["in"]}
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
                    containerClassName="intl-tel-input w-100"
                    inputClassName="form-control w-100"
                    autoComplete="new-off"
                  />
                </div>
                {/* For autoComplete */}
                <input
                  type="text"
                  id="disabled"
                  name="disabled"
                  className="form-control"
                  placeholder="First Name"
                  autoComplete="off"
                  // disabled={isFirstScreenSaved}
                  style={{ display: "none" }}
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

              <div className="d-flex flex-column align-items-center">
                <Link
                  href={{
                    pathname: "/recovery",
                    query: { phone: phone || "" },
                  }}
                >
                  <a
                    className={styles.forgotPassTxt}
                    onClick={() => setShowModal(false)}
                  >
                    Forgot{" "}
                    <span className="text-lowercase">your password? </span>
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
