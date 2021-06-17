import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "@/styles/Modal.module.css";
import ReactDOM from "react-dom";
import SignUpForm from "./SignUp/SignUp";

// import logo from "../../Images/wouldbee1.png";

const SignUpModal = ({ msg, show, children, handleClose }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  // console.log(show);

  useEffect(() => setIsBrowser(true), []);

  const modalContent = show ? (
    <div
      // className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
    >
      <div className={styles.overlay} /*className="modal-dialog"*/>
        <div className={styles.modal} /*className="modal-content"*/>
          <div className={styles.header}>
            <h5 /*className="modal-title"*/>Sign up</h5>

            <FaTimes className={styles.closeBtn} onClick={handleClose} />
          </div>
          <div /*className="modal-body"*/>
            <SignUpForm msg={msg} handleClose={handleClose} />
          </div>
        </div>
      </div>
    </div>
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
