import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "@/styles/Modal.module.css";
import ReactDOM from "react-dom";
import SignUpForm from "./SignUp/SignUp";
import Login from "./Login/Login";
import { ToastContainer } from "react-toastify";

// import logo from "../../Images/wouldbee1.png";

const SignUpModal = ({ msg, show, children, handleClose }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [slideClass, setSlideClass] = useState(styles.right_panel_active);
  // console.log(show);

  useEffect(() => setIsBrowser(true), []);
  useEffect(() => console.log(slideClass), [slideClass]);

  const modalContent = show ? (
    <>
      <div
        // className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        className={styles.body}
      >
        <ToastContainer />
        <div className={styles.overlay} /*className="modal-dialog"*/>
          <div className={styles.modal} /*className="modal-content"*/>
            <FaTimes className={styles.closeBtn} onClick={handleClose} />
            <div className={styles.container} id="container">
              <div className={slideClass}>
                <div className={styles.login_container}>
                  <Login />
                </div>
                <div className={styles.sign_up_container}>
                  <SignUpForm msg={msg} handleClose={handleClose} />
                </div>
                <div className={styles.overlay_container}>
                  <div className={styles.overlay_container_inner}>
                    <div className={styles.overlay_inner}>
                      <div className={styles.overlay_left}>
                        {/* <h1>Welcome Back!</h1> */}
                        <p>Already have an account?</p>
                        <button
                          className="ghost"
                          id="signIn"
                          onClick={() => {
                            setSlideClass(null);
                          }}
                        >
                          Sign In
                        </button>
                      </div>
                      <div className={styles.overlay_right}>
                        {/* <h1>Hello, Friend!</h1> */}

                        <p>Don't have an account?</p>
                        <button
                          className="ghost"
                          id="signUp"
                          onClick={() => {
                            setSlideClass(styles.right_panel_active);
                          }}
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default SignUpModal;
