import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Form1 from "./Forms/SignUpForm";
import styles from "@/styles/Signup.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpForm = (props) => {
  const [formData, setFormData] = useState({
    otp: "",
    phone: "",
    email: "",
    userSource: null,
    phoneAuthToken: "",
    password: "",
    cPassword: "",
  });
  const [pageLoading, setPageLoading] = useState(false);

  const defaultMsg = "Truly Free, Fanatically Safe!";

  return (
    <div className=" container my-4 mx-auto text-left">
      <div className="col mx-auto my-5 text-capitalize">
        <div className={styles.body}>
          {/* <div className={styles.sign_up}>
            <div className={styles.logo}>
              <Image
                src="/Images/wouldbee1.png"
                alt="Wouldbee"
                layout="intrinsic"
                height="100"
                width="300"
              />
            </div>
            <div className={styles.filler1}>
              <Image src="/Images/filler5.png" alt="filler" layout="fill" />
            </div>
            <div className={styles.filler2}>
              <Image src="/Images/filler5.png" alt="filler" layout="fill" />
            </div>

            <p className="text-secondary">{props.msg || defaultMsg}</p>
          </div> */}

          <Form1
            data={formData}
            setData={setFormData}
            pageLoading={pageLoading}
            setPageLoading={setPageLoading}
          />
          {/* <ToastContainer /> */}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
