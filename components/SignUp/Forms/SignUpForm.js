import React, { useContext, useEffect, useState } from "react";

import { FaCheckCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateOtp, schema, verifyOtp } from "./SignUpFormFunctions";
import Form1Content from "./SignUpFormContent";
import styles from "@/styles/Signup.module.css";
import AuthContext from "context/AuthContext";
import { UserSource } from "@/components/FormComponent/FormData";
import { convertedValue } from "@/components/FormComponent/FormFunctions";
import { toast } from "react-toastify";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import NumberFormat from "react-number-format";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function SignUpForm(props) {
  const { data, setData, setShowModal } = props;
  const formType = "signup";
  const router = useRouter();

  // ---- CONTEXT
  const { signUp, userToken, uuId, error } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [timer, setTimer] = useState(60);
  const [wordCount, setWordCount] = useState(0);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [recaptchaResult, setRecaptchaResult] = useState(null);
  const [disablePhoneInput, setDisablePhoneInput] = useState(false);
  const [disableVerifyBtn, setDisableVerifyBtn] = useState(true);

  const [deviceInfo, setDeviceInfo] = useState({
    os: {},
    browser: {},
    screen: {},
  });

  useEffect(() => {
    error && toast.error(error);
  });

  useEffect(() => {
    errors.phoneAuthToken && toast.error(errors.phoneAuthToken.message);
  }, [errors.phoneAuthToken]);

  useEffect(() => {
    if (data.phoneAuthToken) {
      setValue("phoneAuthToken", data.phoneAuthToken);
    } else {
      setValue("phoneAuthToken", "");
    }
  }, [data.phoneAuthToken]);

  useEffect(() => {
    // console.log(deviceInfo);
    setDeviceInfo({
      device: {
        deviceId: uuId,
        // deviceMac: "",
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
      setDisableVerifyBtn(false);
    }
  };

  showOtpInput &&
    setTimeout(() => {
      setTime();
    }, 1000);

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
      setWordCount(() => value.length);
    }
    setValue(name, value, { shouldValidate: true });
    setData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  // ---- SUBMIT
  const submitForm = async () => {
    console.log("sokdlf");
    if (!data.phoneAuthToken) {
      return toast.error("Please verify Phone Number");
    }
    const { email, phone, otp, password, phoneAuthToken, userSource } = data;
    errors && console.log(errors);
    props.setPageLoading(true);

    const response = await signUp({
      email,
      phone,
      otp,
      password,
      phoneAuthToken,
      deviceInfo,
      userSource,
      props,
    });

    if (response) {
      props.setPageLoading(false);
    }

    if (response.status >= 200 && response.status < 300) {
      setShowModal(false);
    }

    if (response.status > 400 && response.status < 500) {
      if (response.status === 409) {
        console.log(response);
        return toast.error("Email already exists.");
      }
      toast.error("Something went wrong. Please try again later");
    }
  };

  const otpVerify = (e) => {
    e.preventDefault();
    // console.log(recaptchaResult);
    verifyOtp(
      uuId,
      data,
      setData,
      setDisableVerifyBtn,
      setShowOtpInput,
      setDisablePhoneInput,
      recaptchaResult
    );
  };

  useEffect(() => {
    router.prefetch("/profile-creation");
  }, []);

  // console.log(errors);

  const MAX_VAL = 9999999999;
  const withValueLimit = ({ value }) => value <= MAX_VAL;
  const MAX_OTP_VAL = 999999;
  const withOtpLimit = ({ value }) => value <= MAX_OTP_VAL;

  return (
    <>
      <div>
        <div className={styles.sign_up_form}>
          <div className="w-100">
            <form
              onSubmit={handleSubmit(submitForm)}
              noValidate
              autoComplete="new-off"
            >
              <h2 className="text-center p-3 text-pink">Sign Up</h2>
              <div className="form-floating my-3 w-100">
                <div className={styles.phoneInput}>
                  <label value="+91" disabled>
                    +91
                  </label>

                  <NumberFormat
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    isAllowed={withValueLimit}
                    className="form-control"
                    placeholder="Phone"
                    type="tel"
                    disabled={disablePhoneInput}
                    autoComplete="off"
                  />

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

                  <div className="d-flex">
                    {!showOtpInput ? (
                      !data.phoneAuthToken ? (
                        <button
                          className="btn btn-pink px-0 sign_up_btn"
                          onClick={(e) => {
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
                            setDisablePhoneInput(true);
                          }}
                          disabled={disableVerifyBtn}
                        >
                          <span className="sign_up_btn">Send Otp</span>
                        </button>
                      ) : (
                        <FaCheckCircle className="my-auto text-success " />
                      )
                    ) : (
                      timer > 0 && <p className="sign_up_btn">{timer} sec</p>
                    )}
                  </div>
                </div>
                <span className="my-auto d-flex justify-content-between">
                  <p className="error-message m-0">
                    {errors.phone && errors.phone.message}
                  </p>
                  {`${wordCount}/10`}
                </span>

                {/* ============ re-captcha */}

                {showRecaptcha && (
                  <div>
                    <div className="" id="recaptcha"></div>
                  </div>
                )}

                {/* ------------- OTP input field */}
                {showOtpInput ? (
                  <div className="d-flex flex-column">
                    <div className="d-flex my-2 w-100">
                      <NumberFormat
                        type="text"
                        name="otp"
                        value={data.otp}
                        onChange={handleChange}
                        isAllowed={withOtpLimit}
                        className="form-control"
                        // style={{ height: "38px" }}
                        placeholder="OTP"
                        autoComplete="off"
                      />
                      <button
                        className="btn btn-pink w-50 sign_up_btn"
                        onClick={otpVerify}
                      >
                        <span className={styles.buttons}>verify otp</span>
                      </button>
                    </div>
                    <p className="error-message">{errors.otp?.message}</p>
                  </div>
                ) : null}
              </div>

              {/* ------------------ PASSWORD and Other fields */}
              {data.phoneAuthToken ? (
                <div className={styles.otherDetails}>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Email"
                      autoComplete="new-off"
                    />
                    <p className="error-message">{errors.email?.message}</p>
                  </div>
                  <div className="my-3 mx-0 w-100">
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      value={data.password}
                      placeholder="Password"
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <p className="error-message">{errors.password?.message}</p>
                  </div>
                  <div className="my-3">
                    <input
                      className="form-control"
                      type="password"
                      name="cPassword"
                      value={data.cPassword}
                      placeholder="Confirm password"
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <p className="error-message">{errors.cPassword?.message}</p>
                  </div>
                  <div className="my-3 text-start">
                    <label className="text-secondary" htmlFor="userSource">
                      Where{" "}
                      <span className="text-lowercase">
                        did you here about us
                      </span>{" "}
                      (Optional)
                    </label>
                    <select
                      className="form-control"
                      name="userSource"
                      id="userSource"
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {UserSource.map((source, index) => {
                        return (
                          <option key={index} value={source}>
                            {convertedValue(source)}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              ) : null}
              <p className="text-pink terms-policy py-0 text-center">
                By{" "}
                <span className="text-lowercase ">
                  continuing, you agree to our
                </span>{" "}
                <br />
                <a
                  target="_blank"
                  href="https://wouldbee.com/terms"
                  className="text-primary"
                >
                  Terms <span className="text-lowercase">of</span> Service
                </a>{" "}
                <span className="text-lowercase">and</span>{" "}
                <a
                  target="_blank"
                  href="https://wouldbee.com/privacy"
                  className="text-primary"
                >
                  Privacy Policy
                </a>
              </p>

              <div className="d-flex w-100 mx-1 mx-sm-3 ">
                <input
                  className="btn btn-pink w-100"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
