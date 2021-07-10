import * as yup from "yup";
import { toast } from "react-toastify";

// -----FORM SCHEMA

export const form3Schema = yup.object().shape({
  degrees: yup.string().required("required"),
  employedIn: yup.string().required("required"),
  occupation: yup.string().required("required"),
  income: yup.string().required("required"),
});

export const SubmitForm3 = (uid, data, props, saveSecondScreen) => {
  saveSecondScreen({
    variables: {
      id: uid,
      degrees: [...data.degrees.value],
      employedIn: data.employedIn,
      occupation: data.occupation.value,
      employerName: data.employerName.name || null,
      designationName: data.designation.name || null,
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
