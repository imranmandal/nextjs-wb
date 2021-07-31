import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import SignUpForm from "./Forms/SignUpForm";
import styles from "@/styles/Signup.module.css";
import modalStyle from "@/styles/Modal.module.css";

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

  const defaultMsg = "Truly Free, Fanatically Safe!";

  return (
    <div className=" container my-4 mx-auto text-left">
      <div className="col mx-auto my-5 ">
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

          <SignUpForm
            data={formData}
            setData={setFormData}
            pageLoading={props.pageLoading}
            setPageLoading={props.setPageLoading}
            setShowModal={props.setShowModal}
          />
          {/* <ToastContainer /> */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
