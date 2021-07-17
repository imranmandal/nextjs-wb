import React, { useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { parseJwt } from "../ParseJwt";
import { FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthContext from "context/AuthContext";
import InputGql from "@/components/FormComponent/InputSearch";
import Select from "@/components/FormComponent/Select";
import { form2Schema, submitForm } from "./Form2functions";
import ConfirmationModal from "@/components/ConfirmationModal";
import styles from "@/styles/Form.module.css";
import modalStyles from "@/styles/Modal.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  GET_CITY_NAME,
  GET_FIRST_SCREEN,
} from "@/components/Graphql/query/query";
import { SAVE_FIRST_PAGE } from "@/components/Graphql/mutations/mutation";
import MultipleSelect from "@/components/FormComponent/MultipleSelect";
import {
  DietaryChoice,
  Disability,
  Height,
  MajorDisease,
  MaritalStatus,
  MotherTongue,
  ProfileManagedBy,
  Religion,
} from "../../FormComponent/FormData";
import { getFullDate } from "@/components/FormComponent/FormFunctions";

// Component start
function Form2(props) {
  const { userToken } = useContext(AuthContext);
  const uid = parseJwt(userToken);

  const [showModal, setShowModal] = useState(false);
  const [isFirstScreenSaved, setIsFirstScreenSaved] = useState(false);

  const [data, setData] = useState({
    fname: "",
    lname: "",
    gender: {
      maleSelected: false,
      femaleSelected: false,
    },
    dob: null,
    managedBy: "",
    maritalStatus: "",
    motherTongue: "",
    religion: "",
    caste: "",
    height: "",
    disability: { innerValue: [], value: [] },
    disease: { innerValue: [], value: [] },
    diet: "",
    city: "",
    smoke: "",
    drink: "",
  });

  const [maxDate, setMaxDate] = useState(null);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(form2Schema),
    mode: "onTouched ",
  });

  // ---- SET MAX AGE

  useEffect(() => {
    const today = new Date();

    if (data.gender.maleSelected) {
      const date = getFullDate(today, 21);
      if (data.dob > date) {
        toast.error(
          "Age must be minimum 21 years for Male and 18 years for Female"
        );
      }
      return setMaxDate(new Date(date.replaceAll("-", ",")));
    }
    if (data.gender.femaleSelected) {
      const date = getFullDate(today, 18);
      return setMaxDate(new Date(date.replaceAll("-", ",")));
    }

    const date = getFullDate(today, 18);
    return setMaxDate(new Date(date.replaceAll("-", ",")));
  }, [data.gender, data.dob]);

  useEffect(() => {
    Object.keys(errors).length > 0 &&
      toast.error("Please fill all the required fields.");
  }, [errors]);

  // ---- MAX AGE END

  const handleGenderChange = (elem) => {
    const name = elem.target.name;
    setValue("gender", name, { shouldValidate: true });
    name === "male"
      ? setData((prevValue) => ({
          ...prevValue,
          gender: {
            maleSelected: true,
            femaleSelected: false,
          },
        }))
      : name === "female" &&
        setData((prevValue) => ({
          ...prevValue,
          gender: {
            maleSelected: false,
            femaleSelected: true,
          },
        }));
  };

  const handleChange = (elem) => {
    const { name, value } = elem.target;
    console.log(value);
    setData((prevValue) => ({ ...prevValue, [name]: value }));
    setValue(name, value, { shouldValidate: true });
  };

  const SavedData = useQuery(GET_FIRST_SCREEN, {
    variables: { id: uid },
  });

  // ---- GRAPHQL MUTATION
  const [saveFirstPage, SavedResponse] = useMutation(SAVE_FIRST_PAGE);

  SavedResponse?.error && console.log(SavedResponse.error);

  const SubmitForm = () => {
    console.log(data.dob, getFullDate(maxDate));
    if (data.dob > getFullDate(maxDate)) {
      toast.error(
        "Age must be minimum 21 years for Male and 18 years for Female"
      );
      return;
    }
    if (isFirstScreenSaved) {
      submitForm(data, uid, props, saveFirstPage, setIsFirstScreenSaved);
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (SavedData.data) {
      const profile = SavedData.data?.user.profile;
      if (profile) {
        setData({
          fname: profile?.firstName,
          lname: profile?.lastName,
          gender: {
            maleSelected: profile?.gender === "MALE" ? true : false,
            femaleSelected: profile?.gender === "FEMALE" ? true : false,
          },
          dob:
            profile?.dob.slice(0, 4) +
            "-" +
            profile?.dob.slice(5, 7) +
            "-" +
            profile?.dob.slice(8, 10),
          managedBy: profile?.profileManagedBy,
          maritalStatus: profile?.maritalStatus,
          motherTongue: profile?.motherTongue,
          religion: profile?.socialDetails.religion,
          height: profile?.otherProfileDetails?.height,
          disability: {
            innerValue: [...profile?.otherProfileDetails.disabilities],
            value: [...profile?.otherProfileDetails.disabilities],
          },
          disease: {
            innerValue: [...profile?.otherProfileDetails.majorDiseases],
            value: [...profile?.otherProfileDetails.majorDiseases],
          },
          diet: profile?.otherProfileDetails.diet,
          city: {
            id: profile?.city.id,
            name:
              profile?.city.name +
              ", " +
              profile.city?.state.name +
              ", " +
              profile?.city.state.country.name,
          },
          smoke: profile?.otherProfileDetails.smoke,
          drink: profile?.otherProfileDetails.drink,
        });

        setValue("managedBy", profile?.profileManagedBy);
        setValue("fname", profile?.firstName);
        setValue("lname", profile?.lastName);
        setValue("dob", profile?.dob);
        setValue("gender", profile?.gender);
        setValue("maritalStatus", profile?.maritalStatus);
        setValue("motherTongue", profile?.motherTongue);
        setValue("religion", profile?.socialDetails.religion);
        setValue("height", profile?.otherProfileDetails?.height);
        setValue("disability", [...profile?.otherProfileDetails.disabilities]);
        setValue("disease", [...profile?.otherProfileDetails.majorDiseases]);
        setValue("diet", profile?.otherProfileDetails.diet);
        setValue("city", profile?.city.name);
        setValue("smoke", profile?.otherProfileDetails.smoke);
        setValue("drink", profile?.otherProfileDetails.drink);

        // First screen is saved
        setIsFirstScreenSaved(true);
      }
    }
  }, [SavedData]);

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.stepCount}>
          Step {props.currentStep} of {props.totalSteps - 1}
        </p>
        <form onSubmit={handleSubmit(SubmitForm)} novalidate>
          <div className="form-floating d-flex flex-column">
            <Select
              label="profile managed by *"
              placeholder=" "
              name="managedBy"
              options={ProfileManagedBy}
              selected={data.managedBy}
              setSelected={setData}
              setValue={setValue}
              errors={errors}
            />
          </div>
          <div className="form-floating d-flex flex-md-row flex-column">
            <div className="p-3 w-100">
              <div className="d-flex justify-content-between">
                <label htmlFor="fname">First Name *</label>
                <p className="error-message">{errors.fname?.message}</p>
                {isFirstScreenSaved && (
                  <span className="text-pink">
                    <FaLock />
                  </span>
                )}
              </div>
              <input
                type="text"
                id="fname"
                name="fname"
                className="form-control"
                value={data.fname}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="First Name"
                disabled={isFirstScreenSaved}
              />
            </div>
            <div className="p-3 w-100" onClick={handleClick}>
              <div className="d-flex justify-content-between">
                <label htmlFor="lname">Last Name *</label>
                <p className="error-message">{errors.lname?.message}</p>
                {isFirstScreenSaved && (
                  <span className="text-pink">
                    <FaLock />
                  </span>
                )}
              </div>
              <input
                type="text"
                id="lname"
                name="lname"
                className="form-control"
                value={data.lname}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="Last Name"
                disabled={isFirstScreenSaved}
              />
            </div>
          </div>
          <div className="d-flex flex-md-row flex-column">
            <div className={styles.gender_grp}>
              <div className="d-flex justify-content-between">
                <label className="my-auto">Gender*</label>
                <p className="error-message">{errors.gender?.message}</p>
                {isFirstScreenSaved && (
                  <span className="text-pink">
                    <FaLock />
                  </span>
                )}
              </div>

              <div className="form-check d-flex">
                <input
                  className="form-check-input my-auto"
                  type="radio"
                  name="male"
                  checked={data.gender.maleSelected}
                  onChange={handleGenderChange}
                  id="male"
                  disabled={isFirstScreenSaved}
                />
                <label className="my-auto" htmlFor="male">
                  male
                </label>
              </div>
              <div className="form-check d-flex">
                <input
                  className="form-check-input my-auto"
                  type="radio"
                  name="female"
                  checked={data.gender.femaleSelected}
                  onChange={handleGenderChange}
                  id="female"
                  disabled={isFirstScreenSaved}
                />
                <label className="my-auto" htmlFor="female">
                  female
                </label>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-between p-3 w-100 position-relative">
              <div className="d-flex justify-content-between">
                <label className="my-auto" htmlFor="dob">
                  DOB *
                </label>
                <p className="error-message">{errors.dob?.message}</p>
                {isFirstScreenSaved && (
                  <span className="text-pink">
                    <FaLock />
                  </span>
                )}
                <div class="invalid-feedback">Please choose a username.</div>
              </div>
              <DatePicker
                id="dob"
                name="dob"
                dateFormat="dd/MM/yyyy"
                placeholderText="DD-MM-YYYY"
                selected={
                  data.dob ? new Date(data.dob?.replaceAll("-", ",")) : null
                }
                onChange={(date) => {
                  setData((prevData) => {
                    // console.log(date.getDate());
                    return { ...prevData, dob: getFullDate(date) };
                  });
                  setValue("dob", getFullDate(date), { shouldValidate: true });
                }}
                openToDate={
                  data.dob
                    ? new Date(data.dob?.replaceAll("-", ","))
                    : new Date(getFullDate(new Date(), 25).replaceAll("-", ","))
                }
                maxDate={maxDate}
                disabled={isFirstScreenSaved}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            </div>
          </div>

          <div className="form2-field-group d-flex flex-md-row flex-column">
            <Select
              label="marital status *"
              placeholder=" "
              name="maritalStatus"
              options={MaritalStatus}
              selected={data.maritalStatus}
              setSelected={setData}
              setValue={setValue}
              disabled={isFirstScreenSaved}
              errors={errors}
            />
            <Select
              label="religion *"
              name="religion"
              placeholder=" "
              options={Religion}
              selected={data.religion}
              setSelected={setData}
              setValue={setValue}
              disabled={isFirstScreenSaved}
              errors={errors}
            />
          </div>

          <div className="form2-field-group d-flex flex-md-row flex-column">
            <Select
              label="mother tongue *"
              name="motherTongue"
              placeholder=" "
              options={MotherTongue}
              selected={data.motherTongue}
              setSelected={setData}
              setValue={setValue}
              errors={errors}
            />
            <Select
              label="height *"
              placeholder="height in feet"
              name="height"
              options={Height}
              selected={data.height}
              setSelected={setData}
              setValue={setValue}
              errors={errors}
            />
          </div>

          <div className="form2-field-group d-flex flex-md-row flex-column">
            <MultipleSelect
              label="disability *"
              name="disability"
              value={data.disability}
              data={data}
              setData={setData}
              setValue={setValue}
              options={Disability}
              errors={errors}
            />

            <MultipleSelect
              label="major diseases *"
              name="disease"
              value={data.disease}
              data={data}
              setData={setData}
              setValue={setValue}
              options={MajorDisease}
              errors={errors}
            />
          </div>

          <div className="form2-field-group d-flex flex-md-row flex-column">
            <InputGql
              name="city"
              value={data.city}
              setData={setData}
              label="resident city *"
              placeholder="type to search"
              QUERY_NAME={GET_CITY_NAME}
              OUTPUT_OBJ_NAME="cities"
              setValue={setValue}
              errors={errors}
            />
            <Select
              label="dietary habits *"
              name="diet"
              options={DietaryChoice}
              selected={data.diet}
              setSelected={setData}
              setValue={setValue}
              errors={errors}
            />
          </div>

          <div className="form2-field-group d-flex justify-content-evenly flex-md-row flex-column">
            <Select
              label="smoke habits *"
              name="smoke"
              placeholder=" "
              options={[
                { text: "Yes", value: true },
                { text: "No", value: false },
              ]}
              selected={data.smoke}
              setSelected={setData}
              setValue={setValue}
              errors={errors}
            />
            <Select
              label="drinking habits *"
              name="drink"
              placeholder=" "
              options={[
                { text: "Yes", value: true },
                { text: "No", value: false },
              ]}
              selected={data.drink}
              setSelected={setData}
              setValue={setValue}
              errors={errors}
            />
          </div>

          <div className="m-3 my-5">
            <input
              type="submit"
              value="Next"
              className="w-100 btn btn-lg btn-pink text-light"
            />
          </div>

          {SavedResponse.loading ? (
            <div className={modalStyles.overlay}>
              <div className="spinner-border text-pink" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : null}
        </form>
      </div>
      <ConfirmationModal
        show={showModal}
        setShowModal={setShowModal}
        handleClose={() => {
          setShowModal(false);
        }}
        submitForm={submitForm}
        data={data}
        uid={uid}
        formProps={props}
        saveFirstPage={saveFirstPage}
        setIsFirstScreenSaved={setIsFirstScreenSaved}
      />
    </>
  );
}

export default Form2;
