import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/Footer.module.css";
import { reportPlayStoreClick } from "GTM";
import {
  GrFacebookOption,
  GrInstagram,
  GrTwitter,
  GrLinkedinOption,
} from "react-icons/gr";

function Footer() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const previousYear = currentYear - 1;

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_top}>
        <div>
          <h5>would bee</h5>
          <ul className={styles.ul}>
            <li>
              <Link href="/">home</Link>
            </li>
            <li>
              <Link href="/about">about us</Link>
            </li>
            <li>
              <Link href="/contact">contact us</Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/company/would-bee/jobs/?viewAsMember=true">
                <a>career</a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5>help</h5>
          <ul className={styles.ul}>
            <li>
              <Link href="https://blog.wouldbee.com/">
                <a>blog</a>
              </Link>
            </li>
            <li>
              <Link href="/FAQ">FAQ</Link>
            </li>
            <li>
              <Link href="/privacy">privacy policy</Link>
            </li>
            <li>
              <Link href="/terms">terms of service</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-capitalize">channels</h5>
          <ul className={styles.ul}>
            <li>
              <Link href="https://play.google.com/store/apps/details?id=apptivism.would_bee.app">
                <a onClick={reportPlayStoreClick}>android app</a>
              </Link>
            </li>
            {/* <li onClick={handleClick}>
              <Link href="/telegram">
                <a>telegram bot</a>
              </Link>
            </li> */}
            <li>
              <Link href="#" scroll={false}>
                <a>web (coming soon)</a>
              </Link>
            </li>
            <li>
              <Link href="#" scroll={false}>
                <a>iOS (Coming Soon)</a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5>Community</h5>
          <ul className={styles.ul}>
            <li>
              <a href="/landing/jain-matrimony" target="_blank">
                Jain Matrimony
              </a>
            </li>
            <li>
              <a href="/landing/baniya-matrimony" target="_blank">
                Baniya Matrimony
              </a>
            </li>
            <li>
              <a href="/landing/marathi-matrimony" target="_blank">
                Marathi Matrimony
              </a>
            </li>
            <li>
              <a href="/landing/muslim-matrimony" target="_blank">
                Muslim Matrimony
              </a>
            </li>
            <li>
              <a href="/landing/christian-matrimony" target="_blank">
                Christian Matrimony
              </a>
            </li>
            <li>
              <a href="/landing/punjabi-matrimony" target="_blank">
                Punjabi Matrimony
              </a>
            </li>
            <li>
              <a href="/landing/south-matrimony" target="_blank">
                South Matrimony
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className={styles.social_h5}>follow us</h5>
          <div className={styles.social}>
            <Link href="https://www.facebook.com/WouldBeeFB">
              <a className={styles.facebook}>
                <GrFacebookOption className="m-auto" />
              </a>
            </Link>

            <Link href="https://www.instagram.com/wouldbee_insta/">
              <a className={styles.instagram}>
                <GrInstagram className="m-auto" />
              </a>
            </Link>

            <Link href="https://twitter.com/WouldBee_">
              <a className={styles.twitter}>
                <GrTwitter className="m-auto" />
              </a>
            </Link>

            <Link href="https://www.linkedin.com/company/74802978/admin/">
              <a className={styles.linkedin}>
                <GrLinkedinOption className="m-auto" />
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.footer_bottom}>
        <div className={styles.copyright}>
          <div className="mx-auto d-flex">
            <a href="/api/sitemap" target="_blank">
              Sitemap
            </a>

            <p className="middot">&middot;</p>
            <p>&copy;{previousYear + "-" + currentYear} wouldbee.com </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
