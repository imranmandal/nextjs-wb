import React from "react";
import Link from "next/link";
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
          <div className="d-flex flex-column">
            <a href="https://play.google.com/store/apps/details?id=apptivism.would_bee.app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
              <img
                style={{ width: "150px" }}
                alt="Get it on Google Play"
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              />
            </a>
            <Link href="/">
              <a className="btn btn-light bg-none text-dark border-0 ">
                <FaAngleLeft />
                Go back home
              </a>
            </Link>
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
      </div>
    </div>
  );
}
