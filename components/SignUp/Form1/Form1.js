import React, { useContext, useEffect, useState } from "react";

import { FaCheckCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateOtp, schema, verifyOtp } from "./Form1Functions";
import Form1Content from "./Form1Content";
import styles from "@/styles/Signup.module.css";
import AuthContext from "context/AuthContext";
import { UserSource } from "@/components/FormComponent/FormData";
import { convertedValue } from "@/components/FormComponent/FormFunctions";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form1(props) {
  const { data, setData } = props;
  const [phoneAuthToken, setPhoneAuthToken] = useState("");
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

  // const deviceinformation = {
  //   deviceId: uuidv4(),
  //   deviceWeb: ""
  // }

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
  const onSubmit = async () => {
    const { email, phone, otp, password, phoneAuthToken, userSource } = data;

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
    verifyOtp(
      uuId,
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
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-floating my-3 mx-1 mx-sm-3">
                <div className={styles.phoneInput}>
                  <label value="+91" disabled>
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
                          setShowOtpInput,
                          setDisablePhoneInput
                        );
                        setDisableVerifyBtn(true);
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
                      {/* <button
                        className="btn btn-pink w-50"
                        // onClick={verifyOtp}
                        disabled={disableVerifyBtn}
                      >
                        resend
                      </button> */}
                    </div>
                    <button className="btn btn-pink w-50" onClick={otpVerify}>
                      verify otp
                    </button>
                  </div>
                ) : null}
              </div>

              {data.phoneAuthToken ? (
                <>
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
              <div className="my-3 mx-1 mx-sm-3">
                <label className="text-secondary" htmlFor="userSource">
                  Where{" "}
                  <span className="text-lowercase">did you here about us</span>{" "}
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
                  <div className="m-3" id="recaptcha"></div>
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
