import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "@/styles/Modal.module.css";
import ReactDOM from "react-dom";
import { submitForm } from "./Profile-creation/Form2/Form2functions";
import {
  convertedCapitalizeValue,
  convertedValue,
  formatDate,
} from "./FormComponent/FormFunctions";

// import logo from "../../Images/wouldbee1.png";

const Confirm = ({ show, handleClose, component }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true), []);

  useEffect(() => {
    if (show) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isBrowser, show]);

  const modalContent = show ? (
    <>
      <div
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        className={styles.body}
      >
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.confirm_modal_container} id="container">
              <FaTimes className={styles.closeBtn} onClick={handleClose} />
              {component}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("confirmModal-root")
    );
  } else {
    return null;
  }
};

export default Confirm;
