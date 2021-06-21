import { useContext, useState } from "react";
import Link from "next/link";
import styles from "@/styles/Header.module.css";
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
                src="/Images/wouldbee1.png"
                alt="Wouldbee"
              />
            </a>
          </Link>
          <div id="navbarSupportedContent" className={styles.navbar}>
            {/* <ul className={styles.navbar_nav}>
             

              {!userToken ? (
                <>
                  <li>
                    <Link href="#" scroll={false}>
                      <a
                        onClick={() => {
                          setShowSignUp(true);
                        }}
                        className="nav-link text-dark bg-light rounded-pill shadow-lg"
                        aria-current="page"
                      >
                        Sign Up
                      </a>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="#" scroll={false}>
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
                  </Link>
                </li>
              )}
            </ul> */}
          </div>
        </div>
      </nav>
      {/* <SignUpModal
        show={showSignUp}
        handleClose={() => {
          setShowSignUp(false);
        }}
      /> */}
    </>
  );
}

export default Header;
