import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import firebase from "../../../firebase";
import jwtDecode from "jwt-decode";
import { API_URL } from "@/config/index";
import * as yup from "yup";

// ------- FORM SCHEMA
export const schema = yup.object().shape({
  email: yup.string().required(),
  phone: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .integer()
    .min(10, "Phone must be at least 10 digits")
    .required("Phone is required"),
  otp: yup.number().positive().integer().min(6).required(),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  cPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

// ------- CHECK NUMBER ALREADY EXISTS
const CheckPhoneExists = async (phone) => {
  const result = await axios
    .get(`${API_URL}/auth/check-phone/${phone}`)
    .then((res) => {
      console.log(res.data.exists);
      return res.data.exists;
    })
    .catch((error) => toast.error(error.message));
  return result;
};

// ------- GENERATE OTP
export const generateOtp = (
  event,
  props,
  setShowRecaptcha,
  setRecaptchaResult,
  setShowOtpInput
) => {
  event.preventDefault();

  const { data, setData } = props;

  const phone = data.phone;

  if (phone.length === 10) {
    CheckPhoneExists(phone).then((res) => {
      // console.log(res);
      if (!res) {
        const captcha = new firebase.auth.RecaptchaVerifier("recaptcha");
        const number = `+91${phone}`;

        // console.log("1");
        firebase
          .auth()
          .signInWithPhoneNumber(number, captcha)
          .then((response) => {
            setRecaptchaResult(response);
            setShowRecaptcha(false);
            setShowOtpInput(true);
          })
          .catch((error) => toast.error(error.message));
      } else {
        toast.error("Phone already exists.");
      }
    });
  } else {
    setShowRecaptcha(false);
  }
};

// ------VERIFY OTP
export const verifyOtp = (
  event,
  data,
  setData,
  setPhoneAuthToken,
  setDisableVerifyBtn,
  setShowOtpInput,
  setDisablePhoneInput,
  recaptchaResult
) => {
  event.preventDefault();
  const captchaResult = recaptchaResult;
  const otp = data.otp;

  if (!otp) return toast.error("Please enter the OTP");
  captchaResult
    .confirm(otp)
    .then(function (result) {
      // Set disable false
      setShowOtpInput(false);

      setDisablePhoneInput(true);

      toast.success(`${result.user.phoneNumber} number verified.`);
      new firebase.auth().currentUser
        .getIdToken(true)
        .then(function (idToken) {
          // console.log(idToken);
          setData((prevValue) => ({
            ...prevValue,
            phoneAuthToken: idToken,
          }));
          setPhoneAuthToken(idToken);
          setDisableVerifyBtn(true);
          return idToken;
        })
        .catch(function (error) {
          console.log(error.message);
        });
    })
    .catch((error) => toast.error("Please check the OTP!"));
};

// ------ FORM SUBMIT
export const submitForm1 = (props, login) => {
  const { data, setData } = props;

  props.setPageLoading(true);

  // props.setPageLoading(false);
};
