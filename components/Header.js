import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Header.module.css";
import SignUpModal from "@/components/SignUpModal";
import AuthContext from "context/AuthContext";

function Header() {
  const { userToken } = useContext(AuthContext);
  const router = useRouter();
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    router.prefetch(`/profile-creation`);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    !userToken
      ? setShowSignUp(true)
      : router.push(
          `/profile-creation/?token=${userToken}`,
          `/profile-creation`,
          { shallow: true }
        );
  };

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
                <Link href="#" scroll={false}>
                  <a
                    onClick={handleClick}
                    className="nav-link text-dark bg-light rounded-pill shadow-lg"
                    aria-current="page"
                  >
                    Sign Up
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <SignUpModal
        show={showSignUp}
        handleClose={() => {
          setShowSignUp(false);
        }}
        setShow={setShowSignUp}
      />
    </>
  );
}

export default Header;
