import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputOccupation from "@/components/FormComponent/InputOccupation";
import InputGql from "@/components/FormComponent/InputSearch";
import Select from "@/components/FormComponent/Select";
import {
  AnnualIncome,
  Degrees,
  EmployedIn,
  Occupation,
} from "@/components/FormComponent/FormData";

import { form3Schema, SubmitForm3 } from "./Form3Functions";
import { SAVE_SECOND_SCREEN } from "@/components/Graphql/mutations/mutation";
import {
  GET_DESIGNATION_NAME,
  GET_EMPLOYER_NAME,
  GET_INSTITUTE_NAMES,
} from "@/components/Graphql/query/query";
import AuthContext from "context/AuthContext";
import { parseJwt } from "../ParseJwt";
import modalStyles from "@/styles/Modal.module.css";
import styles from "@/styles/Form.module.css";
import MultipleSelect from "@/components/FormComponent/MultipleSelect";

//  ------- COMPONENT

function Form3(props) {
  const { userToken } = useContext(AuthContext);

  const [data, setData] = useState({
    degrees: [],
    employedIn: "",
    occupation: {
      text: "",
      value: "",
    },
    employerName: "",
    designation: "",
    income: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(form3Schema),
  });

  const customRegister = {
    degrees: register("degrees"),
    employedIn: register("employedIn"),
    occupation: register("occupation"),
    income: register("income"),
  };

  const [saveSecondScreen, SavedResponse] = useMutation(SAVE_SECOND_SCREEN);

  const submitForm3 = () => {
    const uid = parseJwt(userToken);
    SubmitForm3(uid, data, props, saveSecondScreen);
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.stepCount}>
          Step {props.currentStep} of {props.totalSteps - 1}
        </p>
        <form onSubmit={handleSubmit(submitForm3)}>
          <div className="form3-field-group d-flex flex-md-row flex-column">
            <MultipleSelect
              label="degrees *"
              name="degrees"
              value={data.degrees}
              data={data}
              setData={setData}
              setValue={setValue}
              options={Degrees}
              errors={errors}
            />
            <Select
              label="employed in *"
              name="employedIn"
              placeholder=" "
              selected={data.employedIn}
              setSelected={setData}
              options={EmployedIn}
              customRegister={customRegister}
              errors={errors}
            />
          </div>

          <div className="form3-field-group d-flex flex-md-row flex-column">
            <InputOccupation
              label="occupation *"
              name="occupation"
              value={data.occupation.text}
              placeholder="Select"
              setData={setData}
              options={Occupation}
              customRegister={customRegister}
              errors={errors}
              setValue={setValue}
            />
            <InputGql
              label="Company/Organization you work for"
              name="employerName"
              placeholder="type to search"
              value={data.employerName}
              setData={setData}
              QUERY_NAME={GET_EMPLOYER_NAME}
              OUTPUT_OBJ_NAME={"employers"}
            />
          </div>

          <div className="form3-field-group d-flex flex-md-row flex-column">
            <InputGql
              label="designation name"
              name="designation"
              placeholder="type to search"
              value={data.designation}
              setData={setData}
              QUERY_NAME={GET_DESIGNATION_NAME}
              OUTPUT_OBJ_NAME={"designations"}
            />
            <Select
              label="annual income *"
              name="income"
              placeholder=" "
              selected={data.income}
              setSelected={setData}
              options={AnnualIncome}
              customRegister={customRegister}
              errors={errors}
            />
          </div>

          <div className={styles.btn_grp}>
            <button
              onClick={(e) => {
                e.preventDefault();
                props.previousStep();
              }}
              className="w-100 btn btn-lg btn-pink text-light"
            >
              Previous
            </button>
            <input
              type="submit"
              value="Next"
              className="w-100 btn btn-lg btn-pink text-light"
            />
          </div>
        </form>
        {SavedResponse.loading ? (
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

export default Form3;
