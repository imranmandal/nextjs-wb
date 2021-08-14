import React, { useContext, useEffect, useRef, useState } from "react";
import Select from "@/components/FormComponent/Select";
import { TypeOfIdProof } from "@/components/FormComponent/FormData";
import { FaCamera } from "react-icons/fa";
import { IoAttach } from "react-icons/io5";
import { useForm } from "react-hook-form";
import Compressor from "compressorjs";
import {
  form4Schema,
  handleProfileChange,
  submitForm4,
} from "./Form4Functions";
import { yupResolver } from "@hookform/resolvers/yup";
import modalStyles from "@/styles/Modal.module.css";
import styles from "@/styles/Form.module.css";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";
import Confirm from "@/components/ConfirmationModal";
import { convertedValue } from "@/components/FormComponent/FormFunctions";

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

  const [showProfilePicModal, setShowProfilePicModal] = useState(false);
  const [showIdProofModal, setShowIdProofModal] = useState(false);

  const [showBackPageInput, setShowBackPageInput] = useState(false);
  const [disableFileInput, setDisableFileInput] = useState(true);

  useEffect(() => {
    if (data.verificationDocName) {
      if (data.verificationDocName === "PAN") {
        setData((prevVal) => ({
          ...prevVal,
          verificationDocFile: { ...prevVal.verificationDocFile, backPage: {} },
        }));
        setDisableFileInput(false);
        setShowBackPageInput(false);
        return;
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
      if (data.verificationDocFile.frontPage.name) {
        setShowBackPageInput(true);
      }
    } else {
      setShowBackPageInput(false);
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
      console.log(validatedData.profilePic);
      setShowProfilePicModal(true);
      toast.error("Please select the profile picture");
      return;
    }
    setShowIdProofModal(false);
    submitForm4(
      userToken,
      data,
      setLoading,
      props,
      showBackPageInput,
      setShowIdProofModal
    );
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
      if (name === "frontPage") {
        setValue(name, files, true);
      }
      setLoading(true);
      if (files[0].type === "application/pdf") {
        if (files[0].size > 10000000) {
          return toast.error("Document must be smaller than 10Mb");
        }
        setData((prevVal) => ({
          ...prevVal,
          verificationDocFile: {
            ...prevVal.verificationDocFile,
            [name]: files[0],
          },
        }));
        setLoading(false);
        return;
      }
      if (
        files[0].type === "image/jpg" ||
        files[0].type === "image/jpeg" ||
        files[0].type === "image/png"
      ) {
        new Compressor(files[0], {
          quality: 0.6,
          success: (blob) => {
            const myFile = new File([blob], blob.name.slice(0, 100));

            setData((prevVal) => ({
              ...prevVal,
              verificationDocFile: {
                ...prevVal.verificationDocFile,
                [name]: myFile,
              },
            }));
            setLoading(false);
          },
        });
      } else {
        setLoading(false);
        return toast.error("Please select JPG or PNG images or PDF file");
      }
    }
  };

  const removeSelectedDoc = (e) => {
    e.preventDefault();
    const { name } = e.target;
    if (name === "frontPage") {
      if (data.verificationDocFile.backPage.name) {
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

  const profilePicPriview = (showLabel, customRegister) => (
    <div className="my-auto px-3 d-flex flex-column justify-content-around w-100 border-0">
      <label htmlFor="profilePic" className={styles.profilePreview}>
        <img
          id="picPreview"
          src={data.profilePic}
          alt=""
          onError={(e) => {
            document.getElementById("picPreview").style.display = "none";
          }}
          onLoad={() => {
            document.getElementById("picPreview").style.display =
              "inline-block";
          }}
        />

        <div className={styles.profilePicIcon}>
          <FaCamera />
          <p>Select</p>
        </div>
      </label>
      {showLabel && <label className="mx-auto">Profile Picture *</label>}
      <p className="error-message text-center">
        {errors && errors.profilePic?.message}
      </p>

      <input
        className={styles.verification}
        type="file"
        id="profilePic"
        name="profilePic"
        onChange={(e) => {
          customRegister && customRegister.profilePic.onChange(e);
          handleProfileChange(e, setData, setLoading, setShowProfilePicModal);
        }}
        ref={customRegister && customRegister.profilePic.ref}
      />
    </div>
  );

  const IDProofSelector = (
    <div className="d-flex flex-wrap w-100">
      <Select
        label="Government ID proof (Optional)"
        name="verificationDocName"
        placeholder=" "
        selected={data.verificationDocName}
        setSelected={setData}
        options={TypeOfIdProof}
        setValue={setValue}
        errors={errors}
      />

      <div className={styles.attachLabelContainer}>
        <div className={styles.attachDocLabel}>
          <label htmlFor="frontPage">
            <span className="d-flex flex-fill">
              <IoAttach className={styles.attachDocLabelIcon} />
              <span className="my-auto">Select ID proof front image</span>
            </span>
            <div className="d-flex justify-content-between">
              <span className={styles.filename}>
                {data.verificationDocFile.frontPage.name
                  ? data.verificationDocFile.frontPage.name.slice(0, 15) + "..."
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
              </button>
            )}
          </span>
        </div>

        <input
          className={styles.verification}
          type="file"
          id="frontPage"
          name="frontPage"
          onChange={handleFileChange}
          disabled={disableFileInput}
        />

        <p className="error-message">{errors.frontPage?.message}</p>

        {showBackPageInput ? (
          <>
            <div className={styles.attachDocLabel}>
              <label htmlFor="backPage">
                <span className="d-flex flex-fill">
                  <IoAttach className={styles.attachDocLabelIcon} />
                  <span className="my-auto">Select ID proof back image</span>
                </span>
                <div className="d-flex justify-content-between">
                  <span className={styles.filename}>
                    {data.verificationDocFile.backPage.name
                      ? data.verificationDocFile.backPage.name.slice(0, 15) +
                        "..."
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
                  </button>
                )}
              </span>
            </div>

            <input
              className={styles.verification}
              type="file"
              id="backPage"
              name="backPage"
              onChange={handleFileChange}
              disabled={disableFileInput}
            />
          </>
        ) : null}
      </div>
    </div>
  );

  const ProfilePicDialog = (
    <>
      <h6 className="px-5 pt-5">
        You have not selected profile picture, please select to continue
      </h6>
      <section className="pt-2 pb-4">{profilePicPriview(false)}</section>
      <div className="d-flex justify-content-around">
        <button
          onClick={() => {
            setShowProfilePicModal(false);
          }}
          className="w-25 btn btn-sm text-secondary"
        >
          Cancel
        </button>
      </div>
    </>
  );

  const IDProofDialog = (
    <>
      <h6 className="px-4 pt-5">
        Please select {convertedValue(data.verificationDocName)}
      </h6>
      <section className="py-5 px-4">
        <div className={styles.IDProofSelectorModal}>{IDProofSelector}</div>
      </section>
      <div className="px-4 pt-5 grouped">
        <button
          onClick={() => {
            setShowIdProofModal(false);
            setData((prevValue) => ({
              ...prevValue,
              verificationDocName: "",
              verificationDocFile: {
                frontPage: {},
                backPage: {},
              },
            }));
            setValue("verificationDocName", "");
            submitForm4(
              userToken,
              {
                ...data,
                verificationDocName: "",
                verificationDocFile: {
                  frontPage: {},
                  backPage: {},
                },
              },
              setLoading,
              props,
              showBackPageInput,
              setShowIdProofModal
            );
          }}
          className="w-100 btn btn-sm text-secondary"
        >
          Skip
        </button>
        <button
          onClick={() => {
            setShowIdProofModal(false);
          }}
          className="w-100 btn btn-pink btn-sm text-light"
        >
          Done
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className={styles.container}>
        <p className={styles.stepCount}>
          Step {props.currentStep - 1}
          <span className="text-lowercase"> of </span>
          {props.totalSteps - 2}
        </p>
        <form onSubmit={handleSubmit(submit)}>
          <div className="d-flex flex-md-row flex-column border-0">
            {profilePicPriview(true, customRegister)}
            <div className="d-flex flex-column justify-content-between p-3 w-100">
              <div className="d-flex justify-content-between ">
                <label className="text-left my-auto" htmlFor="bio">
                  Write <span className="text-lowercase">a short bio</span>{" "}
                  (Optional)
                </label>
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

          <div className="form4-field-group d-flex">{IDProofSelector}</div>

          {props.pageLoading ? (
            <div className={modalStyles.loading_container}>
              <div className="spinner-border text-pink m-auto" role="status">
                <span className="visually-hidden h-100 w-100"></span>
              </div>
            </div>
          ) : null}

          <div className={styles.btn_grp}>
            <button
              onClick={(e) => {
                e.preventDefault();
                props.previousStep();
              }}
              className="w-100 btn btn-lg btn-pink text-light"
              disabled={!props.isActive}
            >
              Previous
            </button>
            <input
              type="submit"
              value="Submit"
              className="w-100 btn btn-lg btn-pink text-light"
              disabled={!props.isActive}
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
      <Confirm
        show={showProfilePicModal}
        handleClose={() => {
          setShowProfilePicModal(false, customRegister);
        }}
        component={ProfilePicDialog}
      />
      <Confirm
        show={showIdProofModal}
        handleClose={() => {
          setShowIdProofModal(false);
        }}
        component={IDProofDialog}
      />
    </>
  );
}

export default Form4;
