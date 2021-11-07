import Link from "next/link";
import styles from "@/styles/Header.module.css";
import { WEB_APP_URL } from "@/config/index";

function Header() {
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <Link href="/">
            <a>
              <img
                className={styles.logo}
                src="/Images/wouldbee1.png"
                alt="Wouldbee"
              />
            </a>
          </Link>
          <div id="navbarSupportedContent" className={styles.navbar}>
            <ul className={styles.navbar_nav}>
              <li>
                <a
                  href={`${WEB_APP_URL}/signup`}
                  className="nav-link text-dark bg-light rounded-pill shadow-lg"
                  aria-current="page"
                >
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
