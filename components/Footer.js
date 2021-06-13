import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/Footer.module.css";
import {
  GrFacebookOption,
  GrInstagram,
  GrTwitter,
  GrLinkedinOption,
} from "react-icons/gr";

function Footer() {
  function handleClick() {
    window.scrollTo(0, 0);
  }

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const previousYear = currentYear - 1;

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_top}>
        <div className="col-md-3">
          <h5>would bee</h5>
          <ul className={styles.ul}>
            <li onClick={handleClick}>
              <Link href="/">home</Link>
            </li>
            <li onClick={handleClick}>
              <Link href="/about">about us</Link>
            </li>
            <li onClick={handleClick}>
              <Link href="/contact">contact us</Link>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/would-bee/jobs/?viewAsMember=true">
                career
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5>help</h5>
          <ul className={styles.ul}>
            <li>
              <a href="https://blog.wouldbee.com/">blog</a>
            </li>
            <li onClick={handleClick}>
              <Link href="/FAQ">FAQ</Link>
            </li>
            <li onClick={handleClick}>
              <Link href="/privacy">privacy policy</Link>
            </li>
            <li onClick={handleClick}>
              <Link href="/terms">terms of service</Link>
            </li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5 className="text-capitalize">channels</h5>
          <ul className={styles.ul}>
            <li>
              <a href="https://play.google.com/store/apps/details?id=apptivism.would_bee.app">
                android app
              </a>
            </li>
            {/* <li onClick={handleClick}>
              <Link href="/telegram">
                <a>telegram bot</a>
              </Link>
            </li> */}
            <li>
              <a href="#">web (coming soon)</a>
            </li>
            <li>
              <a href="#">iOS (Coming Soon)</a>
            </li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5 className={styles.social_h5}>follow us</h5>
          <div className={styles.social}>
            <a
              className={styles.facebook}
              href="https://www.facebook.com/WouldBeeFB"
            >
              <GrFacebookOption className="m-auto" />
            </a>
            <a
              className={styles.instagram}
              href="https://www.instagram.com/wouldbee_insta/"
            >
              <GrInstagram className="m-auto" />
            </a>
            <a className={styles.twitter} href="https://twitter.com/WouldBee_">
              <GrTwitter className="m-auto" />
            </a>
            <a
              className={styles.linkedin}
              href="https://www.linkedin.com/company/74802978/admin/"
            >
              <GrLinkedinOption className="m-auto" />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footer_bottom}>
        <div className={styles.copyright}>
          <div className="mx-auto d-flex">
            <a href="/sitemap.xml">Sitemap</a>
            <p className={styles.middot}>&middot;</p>
            <p>&copy;{previousYear + "-" + currentYear} wouldbee.com </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
