import * as yup from "yup";
import { TypeOfIdProof } from "@/components/SignUp/FormData";
import Compressor from "compressorjs";
import { API_URL } from "@/config/index";
import { toast } from "react-toastify";
import { parseJwt } from "../CommonFuntions";

// -----FORM SCHEMA

export const form4Schema = yup.object().shape({
  bio: yup.string().required(),
  verificationDocName: yup
    .string()
    .required("Please select one document to upload"),
  profilePic: yup.mixed().required("Please select a profile pic."),
  frontPage: yup.mixed().required("Please select a file."),
  // .test("fileSize", "picture is too large", (value) => {
  //   console.log(valuep[0]);
  //   return value && value[0].size <= 10000000;
  // }),
  // .test("fileSize", "file is too large", (value) => {
  //   return value && value[0].size <= 10000000;
  // }),
});

// ------ AUTO GENERATE BIO
export const defaultBio =
  "I am a simple and joyful person. I am an Agent with a Less Than High School degree, currently working in Public Sector sector in Mumbai, MH, IND. I am looking for a life partner from a decent family, having good moral values and ethics.";

export const autoGenerateBio = (setData, setValue) => {
  setValue("bio", defaultBio, true);
  setData((prevVal) => ({ ...prevVal, bio: defaultBio }));
};

// ------ HANDLE PROFILE CHANGE
export const handleProfileChange = (e, setData) => {
  const file = e.target.files[0];
  if (file) {
    if (file.type === "image/jpeg" || file.type === "image/png") {
      new Compressor(file, {
        quality: 0.6,
        success: (blob) => {
          console.log(file);
          const myFile = new File([blob], blob.name);
          console.log(myFile);

          setData((prevVal) => ({
            ...prevVal,
            profilePic: URL.createObjectURL(myFile),
            profilePicData: myFile,
          }));
        },
      });
    } else {
      return toast.warning("Please select JPEG,JPG or PNG images");
    }
  }
  setData((prevVal) => ({ ...prevVal }));
};

// ------ HANDLE SUBMIT

export const submitForm4 = async (
  userToken,
  data,
  setLoading,
  props,
  showBackPageInput
) => {
  const uid = parseJwt(userToken);
  const proofTypeId = TypeOfIdProof.indexOf(data.verificationDocName) + 1;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userToken}`);

  const formData = new FormData();
  formData.append("picture", data.profilePicData);
  formData.append("bioText", `${data.bio}`);
  formData.append("proofType", proofTypeId);
  formData.append("id", uid);
  formData.append(
    "idProof",
    data.verificationDocFile.frontPage,
    data.verificationDocFile.frontPage.name
  );
  if (showBackPageInput && data.verificationDocFile.backPage.name) {
    formData.append(
      "idProof",
      data.verificationDocFile.backPage,
      data.verificationDocFile.backPage.name
    );
  }

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "manual",
  };

  setLoading(true);

  const res = await fetch(
    `${API_URL}/profile/save-fourth-screen`,
    requestOptions
  );

  if (res.ok) {
    setLoading(false);
    props.nextStep();
  } else {
    setLoading(false);
    console.log(res.status);
    if (res.status === 409) {
      toast.error("Profile Picture already uploaded! ");
    } else {
      toast.error("Something went wrong!");
    }
  }
};
// ------- END
