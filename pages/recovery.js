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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const Recovery = () => {
  const router = useRouter();
  const {
    query: { phone },
  } = router;

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
        return val.toString().length >= 10;
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
      handlePhoneChange(phone);
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
    const phone = value.slice(2, value.length);
    if (phone.length >= 10) {
      setDisableVerifyBtn(false);
      setShowRecaptcha(true);
    } else {
      setDisableVerifyBtn(true);
      setShowRecaptcha(false);
    }

    setValue("phone", phone);
    setData((prevValue) => {
      if (phone.length === 19) {
        setWordCount(18);
        return { ...prevValue, phone: prevValue.phone };
      }
      setWordCount(() => phone.length);
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
      formType,
      setShowRecaptcha,
      handleGenerateOtp,
      setDisablePhoneInput,
      setDisableVerifyBtn
    );
    setShowRecaptcha(true);
    setDisableVerifyBtn(true);
    setDisablePhoneInput(true);
  };

  function handleGenerateOtp(response) {
    setRecaptchaResult(response);
    setShowRecaptcha(false);
    setShowOtpInput(true);
    setDisablePhoneInput(true);
  }

  const otpVerify = (e) => {
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
  };

  const submitHandler = async () => {
    const res = await fetch(`${API_URL}/auth/v2/reset-password-with-firebase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: `+${data.phone}`,
        newPassword: data.password,
        phoneAuthToken: data.phoneAuthToken,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      router.replace(
        { pathname: "/login", query: { phone: data.phone } },
        "/login"
      );
      toast.success("Password changed successfully");
    } else {
      toast.error("Something went wrong, please try again later.");
    }
  };

  return (
    <>
      <Head>
        <title>Password Recovery</title>
      </Head>
      <div className="my-4 mx-auto text-left">
        <div className="col mx-auto my-5">
          <form
            className={styles.container}
            onSubmit={handleSubmit(submitHandler)}
            formNoValidate
            autoComplete="new-off"
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

            <h2 className="text-center p-3 text-pink">Forgot Password</h2>

            <div className="d-flex flex-column my-3 w-100">
              <div className="d-flex flex-column my-2 mx-auto w-100">
                <div className={styles.phoneInput}>
                  <PhoneInput
                    country={"in"}
                    onlyCountries={["in", "us", "gb", "ca"]}
                    preferredCountries={["in"]}
                    countryCodeEditable={false}
                    disabled={disablePhoneInput}
                    inputProps={{
                      style: { width: "fit-content" },
                      name: "phone",
                      required: true,
                      autoFocus: true,
                      variant: "standard",
                      autoComplete: "off",
                    }}
                    value={data.phone}
                    onChange={(phone) => handlePhoneChange(phone)}
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
                      autoComplete="off"
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
                  formNoValidate
                  type="submit"
                  value="Reset Password"
                  className="btn btn-pink w-100 my-3"
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
