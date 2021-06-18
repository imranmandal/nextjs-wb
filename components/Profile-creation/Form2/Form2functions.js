import * as yup from "yup";

// -----FORM SCHEMA

export const form2Schema = yup.object().shape({
  managedBy: yup.string().required("required"),
  fname: yup.string().min(3).max(50).required("required"),
  lname: yup.string().min(1).required("required"),
  dob: yup.string().required("required"),
  maritalStatus: yup.string().required("required"),
  motherTongue: yup.string().required("required"),
  religion: yup.string().required("required"),
  height: yup.string().required("required"),
  disability: yup.string().required("required"),
  disease: yup.string().required("required"),
  diet: yup.string().required("required"),
  city: yup.string().required("required"),
  smoke: yup.string().required("required"),
  drink: yup.string().required("required"),
});

// ---------HANDLE SUBMIT

export const submitForm = (data, uid, props, saveFirstPage) => {
  saveFirstPage({
    variables: {
      userId: uid,
      firstName: data.fname,
      lastName: data.lname,
      gender:
        (data.gender.maleSelected && "MALE") ||
        (data.gender.femaleSelected && "FEMALE"),
      dob: data.dob.replaceAll("-", "/"),
      city: parseInt(data.city.id),
      motherTongue: data.motherTongue,
      maritalStatus: data.maritalStatus,
      profileManagedBy: data.managedBy,
      religion: data.religion,
      height: parseInt(data.height),
      disabilities: [...data.disability.value],
      majorDiseases: [...data.disease.value],
      diet: data.diet,
      smoke: JSON.parse(data.smoke),
      drink: JSON.parse(data.drink),
    },
  }).then((res) => {
    props.nextStep();
  });
};
