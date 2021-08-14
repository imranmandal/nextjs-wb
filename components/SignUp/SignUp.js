import React, { useState } from "react";
import SignUpForm from "./Forms/SignUpForm";
import styles from "@/styles/Signup.module.css";

const SignUp = (props) => {
  const [formData, setFormData] = useState({
    otp: "",
    phone: "",
    email: "",
    userSource: null,
    phoneAuthToken: "",
    password: "",
    cPassword: "",
  });

  return (
    <div className="my-4 mx-auto text-left">
      <div className="col mx-auto my-5 ">
        <div className={styles.body}>
          <SignUpForm
            data={formData}
            setData={setFormData}
            pageLoading={props.pageLoading}
            setPageLoading={props.setPageLoading}
            setShowModal={props.setShowModal}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
