import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Header.module.css";
import SignUpModal from "@/components/SignUpModal";
import AuthContext from "context/AuthContext";
import {
  GET_INSTITUTE_NAMES,
  GET_PROFILE_CREATION_SCREEN,
} from "./Graphql/query/query";
import { useQuery } from "@apollo/client";
import { parseJwt } from "./Profile-creation/ParseJwt";

function Header() {
  const { userToken, logout } = useContext(AuthContext);
  const router = useRouter();
  const [showSignUp, setShowSignUp] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const uid = parseJwt(userToken);

  const { data, error, loading } = useQuery(GET_PROFILE_CREATION_SCREEN, {
    variables: {
      id: uid,
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data.profile.profileCreationScreen);
      setCurrentStep(data.profile.profileCreationScreen);
    }
  }, [data]);

  const handleClick = () => {
    !userToken
      ? setShowSignUp(true)
      : router.push({
          pathname: "/profile-creation",
          query: {
            currentPage: currentStep || 1,
          },
        });
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
          {/* navbar-nav flex-row ml-auto mb-auto mb-lg-0 */}
          <div id="navbarSupportedContent" className={styles.navbar}>
            <ul className={styles.navbar_nav}>
              {/* {!userToken && (
                <li className="text-light nav-i#profiles">
                    View Profilestem">
                  <a aria-current="page" href="
                  </a>
                </li>
              )} */}

              {/* {!userToken ? ( */}
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

              {/* <li>
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
              </li> */}
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
