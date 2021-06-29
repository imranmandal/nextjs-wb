import React, { useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
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
  GET_SECOND_SCREEN,
} from "@/components/Graphql/query/query";
import AuthContext from "context/AuthContext";
import { parseJwt } from "../ParseJwt";
import modalStyles from "@/styles/Modal.module.css";
import styles from "@/styles/Form.module.css";
import MultipleSelect from "@/components/FormComponent/MultipleSelect";
import { convertedValue } from "@/components/FormComponent/FormFunctions";
import { toast } from "react-toastify";

//  ------- COMPONENT

function Form3(props) {
  const { userToken } = useContext(AuthContext);
  const uid = parseJwt(userToken);

  const [data, setData] = useState({
    degrees: { innerValue: [], value: [] },
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
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(form3Schema),
  });

  useEffect(() => {
    Object.keys(errors).length > 0 &&
      toast.error("Please fill all the fields.");
  }, [errors]);

  const SavedData = useQuery(GET_SECOND_SCREEN, {
    variables: {
      id: uid,
    },
  });

  const [saveSecondScreen, SavedResponse] = useMutation(SAVE_SECOND_SCREEN);

  useEffect(() => {
    if (SavedData.data) {
      // console.log(SavedData.data);
      const profile = SavedData.data?.professionalDetails;
      if (profile) {
        setData({
          degrees: {
            innerValue: [
              ...profile?.degrees.map((degree) => {
                return convertedValue(degree);
              }),
            ],
            value: [...profile?.degrees],
          },
          employedIn: profile?.employedIn,
          occupation: {
            text: convertedValue(profile?.occupation),
            value: profile?.occupation,
          },
          employerName: {
            id: profile?.employer.id,
            name: profile?.employer.name,
          },
          designation: {
            id: profile?.designation.id,
            name: profile?.designation.name,
          },
          income: profile?.annualIncome,
        });

        setValue("degrees", [...profile?.degrees]);
        setValue("occupation", profile?.occupation);
        setValue("employedIn", profile?.employedIn);
        setValue("emloyerName", profile?.employer.name);
        setValue("designation", profile?.designation.name);
        setValue("income", profile?.annualIncome);
      }
    }
  }, [SavedData.data]);

  const submitForm3 = () => {
    // console.log(data);
    SubmitForm3(uid, data, props, saveSecondScreen);
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.stepCount}>
          Step {props.currentStep} of {props.totalSteps - 1}
        </p>
        <form onSubmit={handleSubmit(submitForm3)}>
          <div className={styles.form3_input_container}>
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

            <InputOccupation
              label="occupation *"
              name="occupation"
              value={data.occupation.text}
              setData={setData}
              setValue={setValue}
              placeholder="Select"
              options={Occupation}
              errors={errors}
              setValue={setValue}
            />
          </div>

          <div className={styles.form3_input_container}>
            <InputGql
              label="designation name"
              name="designation"
              placeholder="type to search"
              value={data.designation}
              setData={setData}
              setValue={setValue}
              QUERY_NAME={GET_DESIGNATION_NAME}
              OUTPUT_OBJ_NAME={"designations"}
            />
            <InputGql
              label="Company/Organization you work for"
              name="employerName"
              placeholder="type to search"
              value={data.employerName}
              setData={setData}
              setValue={setValue}
              QUERY_NAME={GET_EMPLOYER_NAME}
              OUTPUT_OBJ_NAME={"employers"}
            />
          </div>

          <div className={styles.form3_input_container}>
            <Select
              label="employed in *"
              name="employedIn"
              placeholder=" "
              selected={data.employedIn}
              setSelected={setData}
              options={EmployedIn}
              setValue={setValue}
              errors={errors}
            />
            <Select
              label="annual income *"
              name="income"
              placeholder=" "
              selected={data.income}
              setSelected={setData}
              options={AnnualIncome}
              setValue={setValue}
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
              <span className="sr-only"></span>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Form3;
