import axios from "axios";
import { toast } from "react-toastify";
import firebase from "../../../firebase";
import { API_URL } from "@/config/index";
import * as yup from "yup";

// ------- FORM SCHEMA
export const schema = yup.object().shape({
  email: yup.string().required(),
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
    .required("Password is required"),
  cPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

// ------- CHECK NUMBER ALREADY EXISTS
const CheckPhoneExists = async (phone, uuId) => {
  const result = await axios
    .get(`${API_URL}/auth/check-phone/${phone}/?sessionId=${uuId}`)
    .then((res) => {
      // console.log(res.data.exists);
      return res.data.exists;
    })
    .catch((error) =>
      toast.error("Something went wrong. Please try again later.")
    );
  return result;
};

// ------- GENERATE OTP
export const generateOtp = (
  event,
  uuId,
  props,
  setShowRecaptcha,
  setRecaptchaResult,
  setShowOtpInput,
  setDisablePhoneInput,
  setDisableVerifyBtn
) => {
  event.preventDefault();

  const { data, setData } = props;

  const phone = data.phone;

  if (phone.length === 10) {
    CheckPhoneExists(phone, uuId).then((res) => {
      // console.log(res);
      if (!res) {
        setDisableVerifyBtn(false);
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
            setDisablePhoneInput(true);
          })
          .catch((error) => {
            toast.error("Something went wrong. Please try again later.");
          });
      } else {
        setDisableVerifyBtn(false);
        toast.error("Phone already exists.");
      }
    });
  } else {
    setShowRecaptcha(false);
  }
};

// ------VERIFY OTP
export const verifyOtp = (
  uuId,
  data,
  setData,
  setDisableVerifyBtn,
  setShowOtpInput,
  setDisablePhoneInput,
  recaptchaResult
) => {
  const captchaResult = recaptchaResult;
  const otp = data.otp;
  const phone = data.phone;

  if (!otp) {
    sendReport(uuId, phone, "false");
    return toast.error("Please enter the OTP");
  }
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

          // setPhoneAuthToken(idToken);
          setDisableVerifyBtn(true);
          return idToken;
        })
        .catch(function (error) {
          console.log(error.message);
        });
      sendReport(uuId, phone, "true");
    })
    .catch((error) => {
      sendReport(uuId, phone, "false");
      toast.error("Please check the OTP!");
    });
};

// Send report
const sendReport = async (uuId, phone, phoneVerified) => {
  // console.log(phone, phoneVerified);

  const res = await fetch(`${API_URL}/auth/update-session/`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId: uuId, phone, phoneVerified }),
  });

  if (res.ok) {
    // console.log({ phone, phoneVerified });
  } else {
    return { status: 400, error: "failed to update session" };
  }
};
