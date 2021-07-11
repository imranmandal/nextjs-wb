import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "@/styles/Modal.module.css";
import ReactDOM from "react-dom";
import { submitForm } from "./Profile-creation/Form2/Form2functions";
import {
  convertedCapitalizeValue,
  convertedValue,
} from "./FormComponent/FormFunctions";

// import logo from "../../Images/wouldbee1.png";

const Confirm = ({
  show,
  handleClose,
  data,
  uid,
  formProps,
  saveFirstPage,
  setShowModal,
  setIsFirstScreenSaved,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true), []);

  useEffect(() => {
    if (show) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isBrowser, show]);

  const handleConfirm = (e) => {
    e.preventDefault();
    submitForm(data, uid, formProps, saveFirstPage, setIsFirstScreenSaved);
    setShowModal(false);
  };

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
            <FaTimes className={styles.closeBtn} onClick={handleClose} />
            <div className={styles.confirm_modal_container} id="container">
              <h6>
                Please confirm the below details. These cannot be changed once
                saved
              </h6>
              <section>
                <div className="grouped">
                  <p>Full Name</p>
                  <p className="text-center text-capitalize">
                    {data.fname + " " + data.lname}
                  </p>
                </div>
                <div className="grouped">
                  <p>Gender</p>
                  <p className="text-center">
                    {data.gender.maleSelected
                      ? "Male"
                      : data.gender.femaleSelected
                      ? "Female"
                      : ""}
                  </p>
                </div>
                <div className="grouped">
                  <p>DOB</p>
                  <p className="text-center">{data.dob}</p>
                </div>
                <div className="grouped">
                  <p>Marital Status</p>
                  <p className="text-center text-capitalize">
                    {convertedCapitalizeValue(data.maritalStatus)}
                  </p>
                </div>
                <div className="grouped">
                  <p>Religion</p>
                  <p className="text-center text-capitalize">
                    {convertedCapitalizeValue(data.religion)}
                  </p>
                </div>
              </section>
              <div className="grouped">
                <button
                  onClick={handleConfirm}
                  className="w-100 btn btn-sm btn-pink text-light"
                >
                  Confirm
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleClose();
                  }}
                  className="w-100 btn btn-sm btn-pink text-light"
                >
                  Cancel
                </button>
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
      document.getElementById("confirmModal-root")
    );
  } else {
    return null;
  }
};

export default Confirm;
