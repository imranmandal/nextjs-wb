import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import styles from "@/styles/Recovery.module.css";
import { useRouter } from "next/router";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  generateOtp,
  verifyOtp,
} from "@/components/SignUp/Forms/SignUpFormFunctions";
import { FaCheckCircle } from "react-icons/fa";
import { API_URL } from "@/config/index";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

const Recovery = () => {
  const router = useRouter();
  const {
    query: { phone },
  } = router;

  const [countryData, setCountryData] = useState({ iso: "in", code: "91" });

  const formType = "recovery";
  const [data, setData] = useState({
    phone: "",
    otp: "",
    password: "",
    cPassword: "",
    phoneAuthToken: "",
  });

  const { uuId, error } = useContext(AuthContext);
  const [timer, setTimer] = useState(60);
  const [wordCount, setWordCount] = useState(0);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [recaptchaResult, setRecaptchaResult] = useState(null);
  const [disablePhoneInput, setDisablePhoneInput] = useState(false);
  const [disableVerifyBtn, setDisableVerifyBtn] = useState(true);

  const schema = yup.object().shape({
    phone: yup
      .number()
      .typeError("you must specify a number")
      .transform((value) => (isNaN(value) ? undefined : value))
      .positive()
      .integer()
      .test("len", "Phone must be exactly 10 characters", (val) => {
        return val.toString().length === 10;
      })
      .required("Please enter phone number and verify"),
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

  useEffect(() => {
    error && toast.error(error);
  });

  useEffect(() => {
    if (phone) {
      setData((prevVal) => ({ ...prevVal, phone: phone }));
      setValue("phone", phone);
    }
  }, [phone]);

  const setTime = () => {
    const nextTimer = timer - 1;
    setTimer((prevValue) => (prevValue > 0 ? nextTimer : prevValue));
    if (nextTimer <= 0) {
      setShowOtpInput(false);
      setTimer(60);
      setDisablePhoneInput(false);
    }
  };

  showOtpInput &&
    setTimeout(() => {
      setTime();
    }, 1000);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(name, e.target.value, { shouldValidate: true });
    setData((prevVal) => ({ ...prevVal, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    if (value.length >= 10) {
      setDisableVerifyBtn(false);
      setShowRecaptcha(true);
    } else {
      setDisableVerifyBtn(true);
      setShowRecaptcha(false);
    }

    setValue("phone", value);
    setData((prevValue) => {
      if (value.length === 19) {
        setWordCount(18);
        return { ...prevValue, phone: prevValue.phone };
      }
      setWordCount(() => value.length);
      return {
        ...prevValue,
        phone: value,
      };
    });
  };

  const sendOtp = (e) => {
    generateOtp(
      e,
      uuId,
      data,
      countryData,
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
  };

  const otpVerify = (e) => {
    e.preventDefault();
    verifyOtp(
      uuId,
      data,
      countryData,
      setData,
      setDisableVerifyBtn,
      setShowOtpInput,
      setDisablePhoneInput,
      recaptchaResult
    );
  };

  const submitHandler = async () => {
    const res = await fetch(`${API_URL}/auth/v2/reset-password-with-firebase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: `+${countryData.code}${data.phone}`,
        newPassword: data.password,
        phoneAuthToken: data.phoneAuthToken,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      // console.log(res);
      router.replace({ pathname: "/", query: { phone: data.phone } });
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
        <div className="col mx-auto my-5">
          <form
            className={styles.container}
            onSubmit={handleSubmit(submitHandler)}
            noValidate
            autoComplete="new-off"
          >
            <h2 className="text-center p-3 text-pink">Forgot Password</h2>

            <div className="d-flex flex-column my-3 w-100">
              <div className="d-flex flex-column my-2 mx-auto w-100">
                <div className={styles.phoneInput}>
                  <IntlTelInput
                    preferredCountries={["in"]}
                    onlyCountries={["in", "us", "gb", "ca"]}
                    fieldName="phone"
                    placeholder="Phone"
                    value={data.phone}
                    onPhoneNumberChange={(isMaxDigit, phone) => {
                      handlePhoneChange(phone);
                    }}
                    onSelectFlag={(index, countryData) => {
                      setCountryData({
                        iso: countryData.iso2,
                        code: countryData.dialCode,
                      });
                    }}
                    containerClassName="intl-tel-input"
                    inputClassName="form-control"
                    disabled={disablePhoneInput}
                    autoComplete="new-off"
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
                      <button
                        className="btn btn-pink px-0 sign_up_btn"
                        onClick={otpVerify}
                      >
                        <span className="sign_up_btn">Verify OTP</span>
                      </button>
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
                  formnovalidate
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
