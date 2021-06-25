import Form2 from "@/components/Profile-creation/Form2/Form2";
import Form3 from "@/components/Profile-creation/Form3/Form3";
import Form4 from "@/components/Profile-creation/Form4/Form4";
import Form5 from "@/components/Profile-creation/Form5/Form5";
import StepWizard from "react-step-wizard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Signup.module.css";

const ProfileCreation = ({ start }) => {
  const count = ["1", "2", "4"];
  console.log(count.indexOf(start) + 1);
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
        <StepWizard initialStep={start}>
          <Form2 />
          <Form3 />
          <Form4 />
          <Form5 />
        </StepWizard>
      </div>
    </>
  );
};

ProfileCreation.getInitialProps = async ({ query }) => {
  console.log("cuurent:", query.currentPage);
  return { start: query.currentPage };
};

export default ProfileCreation;
