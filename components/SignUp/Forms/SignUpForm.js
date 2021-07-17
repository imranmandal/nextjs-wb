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

function SignUpForm(props) {
  const { data, setData, setShowModal } = props;
  const formType = "signup";
  // const [phoneAuthToken, setPhoneAuthToken] = useState("");
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

  const customRegister = {
    email: register("email"),
    phone: register("phone"),
    otp: register("otp"),
    password: register("password"),
    cPassword: register("cPassword"),
  };

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
    }
  };

  showOtpInput &&
    setTimeout(() => {
      setTime();
    }, 1000);

  // ------- HANDLE CHANGE
  const handleChange = (elem) => {
    const { name, value } = elem.target;
    const slicedValue = value.slice(4, value.length);
    if (name === "phone") {
      if (slicedValue.length === 10) {
        setDisableVerifyBtn(false);
        setShowRecaptcha(true);
      } else {
        setDisableVerifyBtn(true);
      }
      setData((prevValue) => ({
        ...prevValue,
        [name]: slicedValue,
      }));
      setWordCount(() => {
        return slicedValue.length;
      });
    }
    setData((prevValue) => ({ ...prevValue, [name]: value }));
  };
  // ---- SUBMIT
  const submitForm = async () => {
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

  return (
    <>
      {/* <ToastContainer /> */}
      <div>
        {/* <sign_upContent /> */}
        <div className={styles.sign_up_form}>
          <div className="w-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!data.phoneAuthToken) {
                  return toast.error("Please verify phone number.");
                }
                handleSubmit(submitForm);
              }}
            >
              <h2 className="text-center p-3 text-pink">Sign Up</h2>
              <div className="form-floating my-3 w-100">
                <div className={styles.phoneInput}>
                  {/* <label value="+91" disabled>
                    +91
                  </label>
                  <input
                    type="text"
                    name="phone"
                    onChange={(e) => {
                      setValue("phone", e.target.value, true);
                      handleChange(e);
                    }}
                    className="form-control"
                    placeholder="Phone"
                    disabled={disablePhoneInput}
                  /> */}
                  <NumberFormat
                    name="phone"
                    // value={phone}
                    onChange={(e) => {
                      setValue(
                        "phone",
                        e.target.value.slice(4, e.target.value.length)
                      );
                      handleChange(e);
                    }}
                    className="form-control"
                    placeholder="Phone"
                    type="tel"
                    prefix={"+91 "}
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
                  <div className="d-flex">
                    <div className="d-flex flex-column my-2 w-100">
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
                      />
                      <p className="error-message">{errors.otp?.message}</p>
                    </div>

                    <button
                      className="btn btn-pink w-50 mt-2 sign_up_btn"
                      onClick={otpVerify}
                    >
                      <span className={styles.buttons}>verify otp</span>
                    </button>
                  </div>
                ) : null}
              </div>

              {/* ------------------ PASSWORD and Other fields */}
              {data.phoneAuthToken ? (
                <div className={styles.otherDetails}>
                  <div className="">
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
                  <div className="my-3">
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
                  <div className="my-3">
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
