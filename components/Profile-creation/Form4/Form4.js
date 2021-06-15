import React, { useContext, useEffect, useRef, useState } from "react";
import Select from "@/components/FormComponent/Select";
import { TypeOfIdProof } from "@/components/FormComponent/FormData";
import { FaCamera, FaTimes } from "react-icons/fa";
import { IoAttach } from "react-icons/io5";
import { Spinner } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import {
  autoGenerateBio,
  defaultBio,
  form4Schema,
  handleProfileChange,
  submitForm4,
} from "./Form4Functions";
import { yupResolver } from "@hookform/resolvers/yup";
import modalStyles from "@/styles/Modal.module.css";
import styles from "@/styles/Form.module.css";
import AuthContext from "context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ----- COMPONENT BEGIN
function Form4(props) {
  const { userToken } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    profilePic: {},
    bio: "",
    verificationDocName: "",
    verificationDocFile: {
      frontPage: {},
      backPage: {},
    },
  });

  const [showBackPageInput, setShowBackPageInput] = useState(false);
  const [disableFileInput, setDisableFileInput] = useState(true);

  useEffect(() => {
    if (data.verificationDocName) {
      if (data.verificationDocName === "PAN") {
        setData((prevVal) => ({
          ...prevVal,
          verificationDocFile: { ...prevVal.verificationDocFile, backPage: {} },
        }));
        setShowBackPageInput(false);
        return;
      }
      if (data.verificationDocFile.frontPage.name) {
        setShowBackPageInput(true);
      }
      return setDisableFileInput(false);
    } else {
      setData((prevVal) => ({
        ...prevVal,
        verificationDocFile: { frontPage: {}, backPage: {} },
      }));
    }
    return setDisableFileInput(true);
  }, [data.verificationDocName]);

  useEffect(() => {
    if (data.verificationDocFile.frontPage) {
      if (data.verificationDocFile.frontPage.type === "application/pdf") {
        return setShowBackPageInput(false);
      }
      if (data.verificationDocName === "PAN" || !data.verificationDocName) {
        return setShowBackPageInput(false);
      }
      setShowBackPageInput(true);
    }
  }, [data.verificationDocFile.frontPage]);

  // ----------- USE HOOK FROM
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(form4Schema),
  });

  const customRegister = {
    bio: register("bio"),
    verificationDocName: register("verificationDocName"),
    profilePic: register("profilePic"),
    frontPage: register("frontPage"),
  };

  const submit = (validatedData) => {
    if (validatedData.profilePic.length === 0) {
      return toast("Please select the profile pic");
    }
    if (validatedData.frontPage.length === 0) {
      return toast("Please select a document.");
    }
    submitForm4(userToken, data, setLoading, props, showBackPageInput);
  };

  // ----- HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevVal) => ({ ...prevVal, [name]: value }));
  };

  // ------ HANDLE FILE CHANGE
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files[0]) {
      console.log(files[0]);
      setData((prevVal) => ({
        ...prevVal,
        verificationDocFile: {
          ...prevVal.verificationDocFile,
          [name]: files[0],
        },
      }));
    }
  };

  const removeSelectedDoc = (e) => {
    e.preventDefault();
    const { name } = e.target;
    console.log(name);
    if (name === "frontPage") {
      if (data.verificationDocFile.backPage.name) {
        // setValue("frontPage", data.verificationDocFile.backPage);
        setData((prevVal) => ({
          ...prevVal,
          verificationDocFile: {
            frontPage: {},
            backPage: {},
          },
        }));
        setShowBackPageInput(false);
        setValue("frontPage", null);
        return;
      }
      setShowBackPageInput(false);
    }
    setData((prevVal) => ({
      ...prevVal,
      verificationDocFile: {
        ...prevVal.verificationDocFile,
        [name]: {},
      },
    }));
  };

  // customRegister.profilePic?.ref && console.log(customRegister.profilePic.ref);
  // errors && console.log(errors);

  return (
    <>
      <div className={styles.container}>
        <ToastContainer />
        <p className={styles.stepCount}>
          Step {props.currentStep} of {props.totalSteps - 1}
        </p>
        <form onSubmit={handleSubmit(submit)}>
          <div className="d-flex flex-md-row flex-column">
            <div className="my-auto px-3 d-flex flex-column justify-content-around w-100">
              <label htmlFor="profilePic" className={styles.profilePreview}>
                <img src={data.profilePic} alt="" />
                <FaCamera className={styles.profilePicIcon} />
              </label>
              <label className="mx-auto">profile pic *</label>
              <p className="error-message text-center">
                {errors && errors.profilePic?.message}
              </p>
              {/* <input
                className={styles.profilePic}
                type="file"
                id="profilePic"
                name="profilePic"
                onChange={(e) => {
                  customRegister.profilePic.onChange(e);
                  handleProfileChange(e, setData);
                }}
                ref={customRegister.profilePic.ref}
              /> */}

              <input
                className={styles.verification}
                type="file"
                id="profilePic"
                name="profilePic"
                onChange={(e) => {
                  customRegister.profilePic.onChange(e);
                  handleProfileChange(e, setData);
                }}
                ref={customRegister.profilePic.ref}
              />
            </div>

            <div className="d-flex flex-column justify-content-between p-3 w-100">
              <div className="d-flex justify-content-between ">
                <label className="text-left my-auto" htmlFor="bio">
                  Write a short bio
                </label>
                <button
                  className="btn btn-light text-pink bg-none border-0"
                  onClick={(e) => {
                    e.preventDefault();
                    autoGenerateBio(setData, setValue);
                  }}
                >
                  Auto Generate
                </button>
              </div>

              <textarea
                className="form-control"
                placeholder="Bio"
                onChange={(e) => {
                  customRegister.bio.onChange(e);
                  handleChange(e);
                }}
                ref={customRegister.bio.ref}
                name="bio"
                id="bio"
                cols="30"
                rows="10"
              ></textarea>
              <p className="error-message">{errors && errors.bio?.message}</p>
            </div>
          </div>

          <div className="form4-field-group d-flex">
            <div className="d-flex flex-wrap w-100">
              <Select
                label="Verification"
                name="verificationDocName"
                placeholder=" "
                selected={data.verificationDocName}
                setSelected={setData}
                options={TypeOfIdProof}
                customRegister={customRegister}
                errors={errors}
              />

              <div className={styles.attachLabelContainer}>
                <div className={styles.attachDocLabel}>
                  <label htmlFor="frontPage">
                    <span className="d-flex flex-fill">
                      <IoAttach className={styles.attachDocLabelIcon} />
                      <span className="my-auto">Front </span>
                    </span>
                    <div className="d-flex justify-content-between">
                      <span className={styles.filename}>
                        {data.verificationDocFile.frontPage.name
                          ? data.verificationDocFile.frontPage.name.slice(
                              0,
                              15
                            ) + "..."
                          : ""}
                      </span>
                    </div>
                  </label>
                  <span>
                    {data.verificationDocFile.frontPage.name && (
                      <button
                        name="frontPage"
                        onClick={removeSelectedDoc}
                        className={styles.removeFileBtn}
                      >
                        X
                        {/* <FaTimes
                          name="frontPage"
                          className="my-auto"
                          fontSize="20"
                        /> */}
                      </button>
                    )}
                  </span>
                </div>

                <input
                  className={styles.verification}
                  type="file"
                  id="frontPage"
                  name="frontPage"
                  onChange={(e) => {
                    customRegister.frontPage.onChange(e);
                    handleFileChange(e);
                  }}
                  ref={customRegister.frontPage.ref}
                  disabled={disableFileInput}
                />

                <p className="error-message">{errors.frontPage?.message}</p>

                {showBackPageInput ? (
                  <>
                    <div className={styles.attachDocLabel}>
                      <label htmlFor="backPage">
                        <span className="d-flex flex-fill">
                          <IoAttach className={styles.attachDocLabelIcon} />
                          <span className="my-auto">Back </span>
                        </span>
                        <div className="d-flex justify-content-between">
                          <span className={styles.filename}>
                            {data.verificationDocFile.backPage.name
                              ? data.verificationDocFile.backPage.name.slice(
                                  0,
                                  15
                                ) + "..."
                              : ""}
                          </span>
                        </div>
                      </label>
                      <span>
                        {data.verificationDocFile.backPage.name && (
                          <button
                            name="backPage"
                            onClick={removeSelectedDoc}
                            className={styles.removeFileBtn}
                          >
                            X
                            {/* <FaTimes className="my-auto" fontSize="20" /> */}
                          </button>
                        )}
                      </span>
                    </div>

                    <input
                      className={styles.verification}
                      type="file"
                      id="backPage"
                      name="backPage"
                      // value={data.verificationDocFile.backPage}
                      onChange={handleFileChange}
                      disabled={disableFileInput}
                    />
                  </>
                ) : null}
              </div>
            </div>
          </div>

          {props.pageLoading ? <Spinner /> : null}

          <div className={styles.btn_grp}>
            <button
              onClick={(e) => {
                e.preventDefault();
                props.previousStep();
              }}
              className="w-100 btn btn-lg btn-pink text-light"
              type="submit"
            >
              Previous
            </button>
            <input
              className="w-100 btn btn-lg btn-pink text-light"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
        {loading ? (
          <div className={modalStyles.overlay}>
            <div className="spinner-border text-pink" role="status">
              <span class="sr-only"></span>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Form4;
