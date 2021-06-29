import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import styles from "@/styles/Recovery.module.css";
import AuthContext from "context/AuthContext";
import { useQuery } from "@apollo/client";
// import { GET_PROFILE_CREATION_SCREEN } from "../Graphql/query/query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { parseJwt } from "@/components/Profile-creation/ParseJwt";
import {
  generateOtp,
  verifyOtp,
} from "@/components/SignUp/Forms/SignUpFormFunctions";
import { Prev } from "node_modules/react-bootstrap/esm/PageItem";
import { FaCheckCircle } from "react-icons/fa";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/config/index";

const Recovery = () => {
  const formType = "recovery";
  const [data, setData] = useState({
    phone: "",
    otp: "",
    password: "",
    cPassword: "",
    phoneAuthToken: "",
  });

  const { uuId, error } = useContext(AuthContext);
  // const [phone, setPhone] = useState("");
  // const [otp, setOtp] = useState("");
  // const [cPassword, setCPassword] = useState("");
  // const [password, setPassword] = useState("");
  const [timer, setTimer] = useState(60);
  const [wordCount, setWordCount] = useState(0);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [recaptchaResult, setRecaptchaResult] = useState(null);
  const [disablePhoneInput, setDisablePhoneInput] = useState(false);
  const [disableVerifyBtn, setDisableVerifyBtn] = useState(true);
  const router = useRouter();
  // const uid = parseJwt(userToken);

  const schema = yup.object().shape({
    phone: yup
      .number()
      .typeError("you must specify a number")
      .transform((value) => (isNaN(value) ? undefined : value))
      .positive()
      .integer()
      .min(10, "Phone must be at least 10 digits")
      .required("Phone is required"),
    otp: yup
      .number("Please enter Number value")
      .typeError("Please enter Number value")
      .positive("Please enter Number value")
      .integer("Please enter Number value")
      .min(6)
      .required("Please enter OTP"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be maximum 20 characters")
      .required("Please enter new password"),
    cPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm the password"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [deviceInfo, setDeviceInfo] = useState({
    os: {},
    browser: {},
    screen: {},
  });

  useEffect(() => {
    error && toast.error(error);
  });

  useEffect(() => {
    // console.log(deviceInfo);
    setDeviceInfo({
      device: {
        deviceId: uuId,
      },
      os: {
        name: navigator.platform,
        language: navigator.language,
      },
      screen: {
        width: screen.width,
        height: screen.height,
      },
      browser: {
        name: navigator.appName,
        appCodeName: navigator.appCodeName,
        product: navigator.product,
        appVersion: navigator.appVersion,
        userAgent: navigator.userAgent,
      },
    });
  }, []);

  const setTime = () => {
    const nextTimer = timer - 1;
    setTimer((prevValue) => (prevValue > 0 ? nextTimer : prevValue));
    if (nextTimer <= 0) {
      setShowOtpInput(false);
      setTimer(60);
      // setData((prevValue) => ({ ...prevValue, otp: "" }));
      setDisablePhoneInput(false);
    }
  };

  showOtpInput &&
    setTimeout(() => {
      setTime();
    }, 1000);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (value.length === 10) {
        setDisableVerifyBtn(false);
        setShowRecaptcha(true);
      } else {
        setDisableVerifyBtn(true);
      }
      setValue(name, e.target.value);
      setData((prevValue) => ({ ...prevValue, [name]: value }));
      setWordCount(() => {
        return value.length;
      });
    }
    setValue(name, e.target.value);
    setData((prevVal) => ({ ...prevVal, [name]: value }));
  };

  const sendOtp = (e) => {
    generateOtp(
      e,
      uuId,
      data,
      formType,
      setShowRecaptcha,
      setRecaptchaResult,
      setShowOtpInput,
      setDisablePhoneInput,
      setDisableVerifyBtn
    );
    setShowRecaptcha(true);
    setDisableVerifyBtn(true);
  };

  const submitHandler = async (verifiedData) => {
    // console.log({ verifiedData });
    const res = await fetch(`${API_URL}/auth/reset-password-with-firebase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: data.phone,
        newPassword: data.password,
        phoneAuthToken: data.phoneAuthToken,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      // console.log(res);
      toast.success("Password changed successfully");
    } else {
      // console.log(res);
      toast.error("Something went wrong, please try again later.");
    }
  };

  return (
    <>
      <Head>
        <title>Password Recovery</title>
      </Head>
      <div className="container my-4 mx-auto text-left">
        <ToastContainer />
        <div className="col mx-auto my-5">
          <form
            className={styles.container}
            onSubmit={handleSubmit(submitHandler)}
          >
            <h2 className="text-center p-3 text-pink">Forgot Password</h2>

            <div className="d-flex flex-column my-3 w-100">
              <div className="d-flex flex-column my-2 mx-auto w-100">
                <div className={styles.phoneInput}>
                  <label value="+91" disabled>
                    +91
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Phone"
                    disabled={disablePhoneInput}
                  />
                  <div className="d-flex">
                    {!showOtpInput ? (
                      !data.phoneAuthToken ? (
                        <button
                          className="btn btn-pink px-0 sign_up_btn"
                          onClick={sendOtp}
                          disabled={disableVerifyBtn}
                        >
                          <span className="sign_up_btn">Send OTP</span>
                        </button>
                      ) : (
                        <FaCheckCircle className="my-auto text-success " />
                      )
                    ) : (
                      timer > 0 && (
                        <span className="sign_up_btn">{timer} sec</span>
                      )
                    )}
                  </div>
                </div>
                <p className="error-message">{errors.phone?.message}</p>
              </div>

              {/* ============ re-captcha */}
              <div className="mx-auto">
                {showRecaptcha && <div id="recaptcha"></div>}
              </div>

              {showOtpInput && (
                <div className="d-flex flex-column my-2 mx-auto w-100">
                  <div className={styles.phoneInput}>
                    <input
                      type="text"
                      name="otp"
                      value={data.otp}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="OTP"
                    />
                    <div className="d-flex">
                      {
                        <button
                          className="btn btn-pink px-0 sign_up_btn"
                          onClick={(e) => {
                            e.preventDefault();
                            verifyOtp(
                              uuId,
                              data,
                              setData,
                              setDisableVerifyBtn,
                              setShowOtpInput,
                              setDisablePhoneInput,
                              recaptchaResult
                            );
                          }}
                        >
                          <span className="sign_up_btn">Verify OTP</span>
                        </button>
                      }
                    </div>
                  </div>
                  <p className="error-message">{errors.otp?.message}</p>
                </div>
              )}

              {data.phoneAuthToken ? (
                <>
                  <div className="d-flex flex-column my-2 w-100">
                    <input
                      type="password"
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Set Password"
                    />
                    <p className="error-message">{errors.password?.message}</p>
                  </div>
                  <div className="d-flex flex-column my-2 w-100">
                    <input
                      type="password"
                      name="cPassword"
                      value={data.cPassword}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Confirm Password"
                    />
                    <p className="error-message">{errors.cPassword?.message}</p>
                  </div>
                </>
              ) : null}

              <div className="d-flex flex-column">
                <input
                  type="submit"
                  value="Reset Password"
                  className="btn btn-pink w-100 "
                />
              </div>
            </div>
            <p className="text-pink terms-policy py-0 text-center">
              <span>@2020-2021 wouldbee.com</span>
              <br />
              <a
                target="_blank"
                href="https://wouldbee.com/terms"
                className="text-primary"
              >
                Terms <span className="text-lowercase">of</span> Service
              </a>{" "}
              <span className="middot">&middot;</span>
              <a
                target="_blank"
                href="https://wouldbee.com/privacy"
                className="text-primary"
              >
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </div>
      {/* <section className="text-center text-secondary">
        @2020-2021 wouldbee.com
      </section> */}
    </>
  );
};

export default Recovery;
