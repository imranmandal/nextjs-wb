import Form2 from "@/components/Profile-creation/Form2/Form2";
import Form3 from "@/components/Profile-creation/Form3/Form3";
import Form4 from "@/components/Profile-creation/Form4/Form4";
import Form5 from "@/components/Profile-creation/Form5/Form5";
import StepWizard from "react-step-wizard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Signup.module.css";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "context/AuthContext";

const ProfileCreation = () => {
  const { userToken } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // if (!userToken) {
    //   return router.push("/");
    // }
  }, []);

  return (
    <>
      <div className={styles.profileCreation}>
        <div className={styles.logo_lg}>
          <Link href="/">
            <Image
              src="/Images/wouldbee1.png"
              alt="Wouldbee"
              layout="intrinsic"
              height="100"
              width="300"
            />
          </Link>
        </div>
        <ToastContainer />
        <StepWizard>
          <Form2 />
          <Form3 />
          <Form4 />
          <Form5 />
        </StepWizard>
      </div>
    </>
  );
};

export default ProfileCreation;
