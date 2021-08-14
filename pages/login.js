import React, { useEffect, useState } from "react";
import loginFormStyle from "@/styles/Login.module.css";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import modalStyles from "@/styles/Modal.module.css";
import Link from "next/link";
import Head from "next/head";
import Login from "@/components/Login/Login";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [pageLoading, setPageLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/profile-creation");
    if (router.query.phone) {
      setPhone(router.query.phone);
    }
  }, []);

  console.log(phone);
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className={loginFormStyle.containerInner}>
        <Login phoneValue={phone} setPageLoading={setPageLoading} />

        <div className={loginFormStyle.bottomLinks}>
          <p className="my-2 text-center">
            Don't have an account?{" "}
            <Link
              href={{
                pathname: "/signup",
                query: { phone: phone || "" },
              }}
              as="/signup"
            >
              <a className="text-pink ">Sign Up</a>
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
      {pageLoading ? (
        <div className={modalStyles.loading_container}>
          <div className="spinner-border text-pink m-auto" role="status">
            <span className="visually-hidden h-100 w-100"></span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LoginPage;
