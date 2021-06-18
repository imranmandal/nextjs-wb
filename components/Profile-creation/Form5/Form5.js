import React from "react";
import Link from "next/link";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaAngleLeft, FaCheckCircle } from "react-icons/fa";
import styles from "@/styles/Form.module.css";

export default function Form5(props) {
  return (
    <div className={styles.container}>
      <div className="text-center">
        <div className={styles.form5_field_content}>
          <FaCheckCircle className={styles.check} />
          <h1>Thank you for registration.</h1>
          <p>we will verify your profile and notify you shortly.</p>
          <div className="d-flex flex-column my-5">
            <p style={{ fontSize: "1.1rem" }}>
              Meanwhile, please install our app to view your matches.
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
        <div className="form5-field-footer my-sm-3 my-5">
          <p className="m-0">In case of any issues please write to</p>
          <a
            className="text-lowercase text-secondary"
            href="mailto:support@wouldbee.com"
          >
            support@wouldbee.com
          </a>
        </div>
        <Link href="/">
          <a className="p-3 bg-none text-dark border-0 ">
            <FaAngleLeft />
            Go back home
          </a>
        </Link>
      </div>
    </div>
  );
}
