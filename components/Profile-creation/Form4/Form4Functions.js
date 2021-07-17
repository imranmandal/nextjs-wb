import * as yup from "yup";
import { TypeOfIdProof } from "@/components/FormComponent/FormData";
import Compressor from "compressorjs";
import { API_URL } from "@/config/index";
import { toast } from "react-toastify";
import { parseJwt } from "../ParseJwt";

// -----FORM SCHEMA

export const form4Schema = yup.object().shape({
  bio: yup.string().min(0).max(2000),
  verificationDocName: yup.string(),
  profilePic: yup.mixed().required("Please select a profile pic."),
  frontPage: yup.mixed(),
});

// ------ HANDLE PROFILE CHANGE
export const handleProfileChange = (e, setData, setLoading) => {
  const file = e.target.files[0];
  console.log(file);
  if (file) {
    setLoading(true);
    if (file.type === "image/jpg" || file.type === "image/png") {
      new Compressor(file, {
        quality: 0.6,
        success: (blob) => {
          const myFile = new File([blob], blob.name);

          setData((prevVal) => ({
            ...prevVal,
            profilePic: URL.createObjectURL(myFile),
            profilePicData: myFile,
          }));
          setLoading(false);
        },
      });
    } else {
      setLoading(false);
      return toast.error("Please select JPG or PNG images");
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
  {
    proofTypeId !== 0 && formData.append("proofType", proofTypeId);
  }

  formData.append("id", uid);
  if (data.verificationDocName) {
    if (data.verificationDocFile.frontPage.name) {
      formData.append(
        "idProof",
        data.verificationDocFile.frontPage,
        data.verificationDocFile.frontPage.name
      );
    } else {
      return toast.error("Please upload the selected Govt. ID Proof");
    }
    if (showBackPageInput && data.verificationDocFile.backPage.name) {
      formData.append(
        "idProof",
        data.verificationDocFile.backPage,
        data.verificationDocFile.backPage.name
      );
    }
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
