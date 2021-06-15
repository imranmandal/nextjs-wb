import React, { useContext, useEffect, useState } from "react";

import { FaCheckCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  generateOtp,
  schema,
  verifyOtp as otpVerification,
} from "./Form1Functions";
import Form1Content from "./Form1Content";
// import { AuthContext } from "Context/auth.context";
import styles from "@/styles/Signup.module.css";
import AuthContext from "context/AuthContext";

function Form1(props) {
  const { data, setData } = props;
  const [phoneAuthToken, setPhoneAuthToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const customRegister = {
    email: register("email"),
    phone: register("phone"),
    otp: register("otp"),
    password: register("password"),
    cPassword: register("cPassword"),
  };

  const [wordCount, setWordCount] = useState(0);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [recaptchaResult, setRecaptchaResult] = useState(null);
  const [disablePhoneInput, setDisablePhoneInput] = useState(false);
  const [disableVerifyBtn, setDisableVerifyBtn] = useState(true);

  // ---- CONTEXT
  const { login, userToken, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  useEffect(() => {
    if (data.phoneAuthToken) {
      localStorage.setItem("phoneAuthToken", data.phoneAuthToken);
    }
  }, [phoneAuthToken]);

  // ------- HANDLE CHANGE
  const handleChange = (elem) => {
    const { name, value } = elem.target;
    if (name === "phone") {
      if (value.length === 10) {
        setDisableVerifyBtn(false);
        setShowRecaptcha(true);
      } else {
        setDisableVerifyBtn(true);
      }
      setData((prevValue) => ({ ...prevValue, [name]: value }));
      setWordCount(() => {
        return value.length;
      });
    }
    setData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  // ---- SUBMIT
  const onSubmit = () => {
    const { email, phone, otp, password, phoneAuthToken, userSource } = data;

    props.setPageLoading(true);

    login({
      email,
      phone,
      otp,
      password,
      phoneAuthToken,
      userSource,
      props,
    })
      .then(() => {
        props.setPageLoading(false);
      })
      .catch(() => props.setPageLoading(false));
  };

  const verifyOtp = async (e) => {
    otpVerification(
      e,
      data,
      setData,
      setPhoneAuthToken,
      setDisableVerifyBtn,
      setShowOtpInput,
      setDisablePhoneInput,
      recaptchaResult
    );
  };

  return (
    <>
      <div className={styles.form1}>
        <Form1Content />

        <div className={styles.form1_form}>
          <div className="w-100 p-4 p-sm-3">
            <h2 className="text-center p-3">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="m-1 m-sm-3">
                <input
                  type="email"
                  name="email"
                  onChange={(e) => {
                    customRegister.email.onChange(e);
                    handleChange(e);
                  }}
                  className="form-control"
                  placeholder="Email"
                  ref={customRegister.email.ref}
                />
                <p className="error-message">{errors.email?.message}</p>
              </div>
              <div className="form-floating my-3 mx-1 mx-sm-3">
                <div className="d-flex">
                  <input
                    type="text"
                    value="+91"
                    className="form-control "
                    disabled
                    style={{ width: "3rem", padding: "5px" }}
                  />
                  <input
                    type="text"
                    name="phone"
                    onChange={(e) => {
                      customRegister.phone.onChange(e);
                      handleChange(e);
                    }}
                    ref={customRegister.phone.ref}
                    className="form-control"
                    placeholder="Phone"
                  />
                  <div className="d-flex">
                    <button
                      className="btn btn-pink"
                      onClick={(e) => {
                        generateOtp(
                          e,
                          props,
                          setShowRecaptcha,
                          setRecaptchaResult,
                          setShowOtpInput
                        );
                      }}
                      disabled={disableVerifyBtn}
                    >
                      {data.phoneAuthToken ? (
                        <FaCheckCircle className="my-auto text-primary" />
                      ) : (
                        "verify"
                      )}
                    </button>
                  </div>
                </div>
                <span className="my-auto d-flex justify-content-between">
                  <p className="error-message m-0">
                    {errors.phone && errors.phone.message}
                  </p>
                  {`${wordCount}/10`}
                </span>

                {showOtpInput ? (
                  <div className="d-flex flex-column">
                    <div className="d-flex  flex-column my-2">
                      <input
                        type="text"
                        name="otp"
                        onChange={(e) => {
                          customRegister.otp.onChange(e);
                          handleChange(e);
                        }}
                        ref={customRegister.otp.ref}
                        className="form-control"
                        placeholder="OTP"
                        disabled={disablePhoneInput}
                      />
                      <p className="error-message">{errors.otp?.message}</p>
                      {/* <button
                        className="btn btn-pink w-50"
                        // onClick={verifyOtp}
                        disabled={disableVerifyBtn}
                      >
                        resend
                      </button> */}
                    </div>
                    <button
                      className="btn btn-pink w-50"
                      onClick={verifyOtp}
                      disabled={disableVerifyBtn}
                    >
                      verify otp
                    </button>
                  </div>
                ) : null}
              </div>

              {data.phoneAuthToken ? (
                <>
                  <div className="my-3 mx-1 mx-sm-3">
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={(e) => {
                        customRegister.password.onChange(e);
                        handleChange(e);
                      }}
                      ref={customRegister.password.ref}
                    />
                    <p className="error-message">{errors.password?.message}</p>
                  </div>
                  <div className="my-3 mx-1 mx-sm-3">
                    <input
                      className="form-control"
                      type="password"
                      name="cPassword"
                      placeholder="Confirm password"
                      onChange={(e) => {
                        customRegister.cPassword.onChange(e);
                        handleChange(e);
                      }}
                      ref={customRegister.cPassword.ref}
                    />
                    <p className="error-message">{errors.cPassword?.message}</p>
                  </div>
                </>
              ) : null}

              <div className="d-flex justify-content-between">
                <input
                  className="w-100 mx-1 mx-sm-3 btn btn-lg btn-pink text-light"
                  type="submit"
                  value="Submit"
                />

                {userToken ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      props.nextStep();
                    }}
                    className="w-100 mx-3 btn btn-lg btn-pink text-light"
                  >
                    Next
                  </button>
                ) : null}
              </div>
              {showRecaptcha && (
                <div className="my-3 mx-auto mx-sm-auto">
                  <div className="m-1" id="recaptcha"></div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form1;
