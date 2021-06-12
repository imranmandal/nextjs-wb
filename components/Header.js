import { useContext, useState } from "react";
// import logo from "/images/wouldbee1.png";
import Link from "next/link";
import styles from "@/styles/Header.module.css";
// import Modal from "./SignUpModal";
import SignUpModal from "@/components/SignUpModal";

import AuthContext from "context/AuthContext";

function Header() {
  const { userToken, logout } = useContext(AuthContext);
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <Link href="/">
            <a>
              <img
                className={styles.logo}
                src="/images/wouldbee1.png"
                alt="Wouldbee"
              />
            </a>
          </Link>
          {/* navbar-nav flex-row ml-auto mb-auto mb-lg-0 */}
          <div id="navbarSupportedContent" className={styles.navbar}>
            <ul className={styles.navbar_nav}>
              {/* {!userToken && (
                <li className="text-light nav-item">
                  <a aria-current="page" href="#profiles">
                    View Profiles
                  </a>
                </li>
              )} */}

              {!userToken ? (
                <>
                  <li>
                    <a
                      onClick={() => {
                        setShowSignUp(true);
                      }}
                      className="nav-link text-dark bg-light rounded-pill shadow-lg"
                      aria-current="page"
                    >
                      Sign Up
                    </a>
                  </li>
                </>
              ) : (
                <li>
                  <a
                    className="nav-link text-dark bg-light rounded-pill shadow-lg"
                    onClick={(e) => {
                      e.preventDefault();

                      // Logout
                      logout();
                    }}
                    aria-current="page"
                  >
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <SignUpModal
        show={showSignUp}
        handleClose={() => {
          setShowSignUp(false);
        }}
      />
    </>
  );
}

export default Header;
