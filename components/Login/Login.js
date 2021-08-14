import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/Signup.module.css";
import AuthContext from "context/AuthContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import Link from "next/link";
import * as yup from "yup";

const Login = ({ setPageLoading, setShowModal, phoneValue }) => {
  const { login } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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

  useEffect(() => {
    router.prefetch("/profile-creation");
  }, []);

  useEffect(() => {
    if (phoneValue) {
      setPhone(phoneValue);
      setValue("phone", phoneValue);
    }
  }, [phoneValue]);

  const handleLogin = async () => {
    setPageLoading(true);

    if (phone.length < 8) {
      toast.error("Please check the phone number");
      setPageLoading(false);
      return;
    }

    const response = await login({ phone, password });

    if (response) {
      setPageLoading(false);
      setShowModal && setShowModal(false);

      router.push(
        `/profile-creation/?token=${response.token}`,
        `/profile-creation`
      );
    } else {
      setPageLoading(false);
    }
  };

  const handlePhoneChange = (value) => {
    setValue("phone", phone);
    setPhone((prevValue) => {
      if (phone.length === 19) {
        return prevValue;
      }
      return value;
    });
  };

  return (
    <div className={styles.login_form}>
      <div className="login-form-container-inner w-100 mt-5">
        <form
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
            style={{ display: "none" }}
          />

          <h2 className="text-center p-3 text-pink">Sign In</h2>

          <div className=" mx-1 mx-sm-3 w-100">
            <div className="d-flex flex-column my-3 w-100">
              <div className={styles.phoneInput}>
                <PhoneInput
                  country={"in"}
                  onlyCountries={["in", "us", "gb", "ca"]}
                  preferredCountries={["in"]}
                  countryCodeEditable={false}
                  containerClass="w-100 tel-input"
                  inputClass="form-control"
                  inputProps={{
                    style: { zIndex: "1" },
                    name: "phone",
                    required: true,
                    variant: "standard",
                  }}
                  value={phone}
                  onChange={(phone) => handlePhoneChange(phone)}
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

            <div className="d-flex flex-column align-items-center">
              <Link
                href={{
                  pathname: "/recovery",
                  query: { phone: phone || "" },
                }}
                as="/recovery"
              >
                <a
                  className={styles.forgotPassTxt}
                  onClick={() => setShowModal && setShowModal(false)}
                >
                  Forgot <span className="text-lowercase">your password? </span>
                </a>
              </Link>
              <input
                type="submit"
                value="Sign In"
                className="btn btn-pink w-100"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
