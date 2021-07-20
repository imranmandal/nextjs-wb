import React from "react";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaAngleLeft, FaCheckCircle } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import styles from "@/styles/Form.module.css";
import AuthContext from "context/AuthContext";

export default function Form5(props) {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <div className={styles.container_form5}>
        <div className={styles.container_inner}>
          <div>
            <div className={styles.form5_field_content}>
              <FaCheckCircle className={styles.check} />
              <h1>Thank you for registration.</h1>
              <p>
                we{" "}
                <span className="text-lowercase">
                  will verify your profile and notify you shortly.
                </span>
              </p>
              <div className="d-flex flex-column my-4">
                <p style={{ fontSize: "1.1rem" }}>
                  Meanwhile,{" "}
                  <span className="text-lowercase">
                    please install our app to view your matches.
                  </span>
                </p>
                <div className={styles.downloadBtn}>
                  <a
                    className="download"
                    href="https://play.google.com/store/apps/details?id=apptivism.would_bee.app"
                    onClick="return gtag_report_conversion('https://wouldbee.com')"
                  >
                    download app
                    <IoLogoGooglePlaystore className="mx-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="form5-field-footer my-sm-2 my-3">
              <p className="m-0">
                In{" "}
                <span className="text-lowercase">
                  case of any issues please write to
                </span>
              </p>
              <a
                className="text-lowercase text-secondary"
                href="mailto:support@wouldbee.com"
              >
                support@wouldbee.com
              </a>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <Link href="/">
              <a className="p-3 bg-none text-dark border-0 my-auto">
                <FaAngleLeft />
                Go back home
              </a>
            </Link>
            <div className={styles.logoutBtn}>
              <Link href="#" scroll={false}>
                <a
                  className="nav-link text-dark bg-light rounded-pill my-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                  aria-current="page"
                >
                  <BiLogOutCircle color="#e11c74" />
                  Logout
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
