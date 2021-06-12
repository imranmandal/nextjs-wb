import * as yup from "yup";
import { toast } from "react-toastify";

// -----FORM SCHEMA

export const form3Schema = yup.object().shape({
  degree: yup.string().required("required"),
  institute: yup.string().required("required"),
  employedIn: yup.string().required("required"),
  occupation: yup.string().required("required"),
  income: yup.string().required("required"),
});

export const SubmitForm3 = (uid, data, props, saveSecondScreen) => {
  saveSecondScreen({
    variables: {
      id: uid,
      degree: data.degree,
      gradIntituteName: data.institute.name,
      employedIn: data.employedIn,
      occupation: data.occupation.value,
      employerName: data.employerName.name,
      designationName: data.designation.name,
      annualIncome: data.income,
    },
  })
    .then((res) => {
      props.nextStep();
    })
    .catch((error) => {
      toast.error(error.message);
    });
};
