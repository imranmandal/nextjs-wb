import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthContext from "context/AuthContext";
import { parseJwt } from "../CommonFuntions";
import InputGql from "@/components/FormComponent/InputSearch";
import Select from "@/components/FormComponent/Select";
import { form2Schema, submitForm } from "./Form2functions";
import styles from "@/styles/Form.module.css";
import modalStyles from "@/styles/Modal.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { GET_CITY_NAME } from "@/components/Graphql/query/query";
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
} from "../../SignUp/FormData";

// Component start
function Form2(props) {
  const { userToken } = useContext(AuthContext);

  // console.log(typeof parseJwt(userToken));
  const [data, setData] = useState({
    fname: "",
    lname: "",
    gender: {
      maleSelected: true,
      femaleSelected: false,
    },
    managedBy: "",
    maritalStatus: "",
    motherTongue: "",
    religion: "",
    caste: "",
    height: "",
    disability: [],
    disease: [],
    diet: "",
    city: "",
    smoke: "",
    drink: "",
  });

  const [maxAge, setMaxAge] = useState(0);
  const [maxDate, setMaxDate] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(form2Schema),
    mode: "onTouched ",
  });

  // ---- SET MAX AGE

  useEffect(() => {
    if (data.gender.maleSelected) {
      return setMaxAge(21);
    }
    return setMaxAge(18);
  }, [data.gender.maleSelected]);

  useEffect(() => {
    const today = new Date();
    const dd = (today.getDate() < 10 ? "0" : "") + today.getDate();
    const MM = (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1);
    setMaxDate(`${today.getFullYear() - maxAge}` + "-" + `${MM}` + "-" + dd);
  }, [maxAge]);
  // ---- MAX AGE END

  const customRegister = {
    managedBy: register("managedBy"),
    fname: register("fname"),
    lname: register("lname"),
    dob: register("dob"),
    maritalStatus: register("maritalStatus"),
    motherTongue: register("motherTongue"),
    religion: register("religion"),
    height: register("height"),
    disability: register("disability"),
    disease: register("disease"),
    diet: register("diet"),
    smoke: register("smoke"),
    city: register("city"),
    drink: register("drink"),
  };

  const handleGenderChange = (elem) => {
    const name = elem.target.name;
    name === "male"
      ? setData((prevValue) => ({
          ...prevValue,
          gender: {
            maleSelected: true,
            femaleSelected: false,
          },
        }))
      : setData((prevValue) => ({
          ...prevValue,
          gender: {
            maleSelected: false,
            femaleSelected: true,
          },
        }));
  };

  const handleChange = (elem) => {
    const { name, value } = elem.target;
    setData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  // ---- GRAPHQL MUTATION
  const [saveFirstPage, SavedResponse] = useMutation(SAVE_FIRST_PAGE);

  const submit = () => {
    const uid = parseJwt(userToken);
    submitForm(data, uid, props, saveFirstPage);
  };
  // TODO: Create error - Min age should be 21/18 years for male/female

  return (
    <>
      <div className={styles.container}>
        <p className={styles.stepCount}>
          Step {props.currentStep} of {props.totalSteps - 1}
        </p>
        <form onSubmit={handleSubmit(submit)}>
          <div className="form-floating d-flex flex-column">
            <Select
              label="profile managed by *"
              placeholder=" "
              name="managedBy"
              options={ProfileManagedBy}
              setSelected={setData}
              customRegister={customRegister}
              errors={errors}
            />
          </div>
          <div className="form-floating d-flex flex-md-row flex-column">
            <div className="p-3 w-100">
              <div className="d-flex justify-content-between">
                <label htmlFor="fname">First Name *</label>
                <p className="error-message">{errors.fname?.message}</p>
              </div>
              <input
                type="text"
                id="fname"
                name="fname"
                className="form-control"
                onChange={(e) => {
                  customRegister.fname.onChange(e);
                  handleChange(e);
                }}
                placeholder="Jon"
                ref={customRegister.fname.ref}
              />
            </div>
            <div className="p-3 w-100">
              <div className="d-flex justify-content-between">
                <label htmlFor="lname">Last Name *</label>
                <p className="error-message">{errors.lname?.message}</p>
              </div>
              <input
                type="text"
                id="lname"
                name="lname"
                className="form-control"
                onChange={(e) => {
                  customRegister.lname.onChange(e);
                  handleChange(e);
                }}
                placeholder="Doe"
                ref={customRegister.lname.ref}
              />
            </div>
          </div>
          <div className="d-flex flex-md-row flex-column">
            <div className={styles.gender_grp}>
              <label className="my-auto">Gender</label>
              <div className="form-check d-flex">
                <input
                  className="form-check-input my-auto"
                  type="radio"
                  name="male"
                  checked={data.gender.maleSelected}
                  onChange={handleGenderChange}
                  id="male"
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
                />
                <label className="my-auto" htmlFor="female">
                  female
                </label>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-between p-3 w-100">
              <div className="d-flex justify-content-between">
                <label className="my-auto" htmlFor="dob">
                  DOB *
                </label>
                <p className="error-message">{errors.dob?.message}</p>
              </div>
              <input
                type="date"
                id="dob"
                name="dob"
                className="form-control w-100"
                placeholder="dd/mm/yyyy"
                // value={data.dob}
                max={maxDate}
                onChange={(e) => {
                  customRegister.dob.onChange(e);
                  handleChange(e);
                }}
                ref={customRegister.dob.ref}
              />
            </div>
          </div>

          <div className="form2-field-group d-flex flex-md-row flex-column">
            <Select
              label="marital status *"
              placeholder=" "
              name="maritalStatus"
              options={MaritalStatus}
              setSelected={setData}
              customRegister={customRegister}
              errors={errors}
            />
            <Select
              label="mother tongue *"
              name="motherTongue"
              placeholder="Language"
              options={MotherTongue}
              selected={data.motherTongue}
              setSelected={setData}
              customRegister={customRegister}
              errors={errors}
            />
          </div>

          <div className="form2-field-group d-flex flex-md-row flex-column">
            <Select
              label="religion *"
              name="religion"
              options={Religion}
              selected={data.religion}
              setSelected={setData}
              customRegister={customRegister}
              errors={errors}
            />
            <Select
              label="height *"
              placeholder="height in feet"
              name="height"
              options={Height}
              selected={data.height}
              setSelected={setData}
              customRegister={customRegister}
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
              // refs={register}
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
              // refs={register}
              options={MajorDisease}
              errors={errors}
            />
          </div>

          <div className="form2-field-group d-flex flex-md-row flex-column">
            <Select
              label="dietary habits *"
              name="diet"
              options={DietaryChoice}
              selected={data.diet}
              setSelected={setData}
              customRegister={customRegister}
              errors={errors}
            />
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
              customRegister={customRegister}
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
              customRegister={customRegister}
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
              customRegister={customRegister}
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
    </>
  );
}

export default Form2;
