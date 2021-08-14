import React, { useEffect, useState } from "react";
import SignUpForm from "@/components/SignUp/Forms/SignUpForm";
import styles from "@/styles/Signup.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import modalStyle from "@/styles/Modal.module.css";
import Head from "next/head";

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
  const router = useRouter();

  useEffect(() => {
    if (router.query.phone) {
      setFormData((prevValue) => ({ ...prevValue, phone: router.query.phone }));
    }
  }, [router.query.phone]);

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="my-4 mx-auto text-left">
        <div className={styles.containerInner}>
          <div className={styles.body}>
            <SignUpForm
              data={formData}
              setData={setFormData}
              pageLoading={props.pageLoading}
              setPageLoading={props.setPageLoading}
              setShowModal={props.setShowModal}
            />

            <div className="text-center pt-3">
              <p className="my-2">
                Already have an account?{" "}
                <Link
                  href={{
                    pathname: "/login",
                    query: { phone: formData.phone || "" },
                  }}
                  as="/login"
                >
                  <a className="text-pink ">Sign In</a>
                </Link>
              </p>
              <Link href="/">
                <a className="text-pink">
                  <AiOutlineDoubleLeft />
                  Go back home
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
