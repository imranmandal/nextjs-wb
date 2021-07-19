import { useContext, useEffect } from "react";
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
import { useQuery } from "@apollo/client";
import Head from "next/head";
import { GET_PROFILE_CREATION_SCREEN } from "@/components/Graphql/query/query";
import { parseJwt } from "@/components/Profile-creation/ParseJwt";
import { useRouter } from "next/router";
import AuthContext from "context/AuthContext";

const ProfileCreation = ({ query: { userToken } }) => {
  const count = [1, 2];
  const router = useRouter();
  const { serverLoading } = useContext(AuthContext);

  const uid = parseJwt(userToken);

  const { data, error, loading } = useQuery(GET_PROFILE_CREATION_SCREEN, {
    variables: {
      id: uid,
    },
  });

  useEffect(() => {
    if (!userToken) {
      router.back();
      return;
    }
  }, [userToken]);

  return (
    <>
      <Head>
        <title>Profile Creation</title>
      </Head>
      {userToken && (
        <div className={styles.profileCreation}>
          <div className={styles.logo_lg}>
            <Link href="/">
              <Image
                src="/Images/wouldbee1.png"
                alt="Wouldbee"
                layout="intrinsic"
                height="93"
                width="300"
              />
            </Link>
          </div>
          <ToastContainer />

          {loading ? (
            <div className="container d-flex">
              <h5 className="m-auto h-100 text-secondary">Loading...</h5>
            </div>
          ) : (
            <StepWizard
              initialStep={
                count.indexOf(data?.profile?.profileCreationScreen) < 0
                  ? data?.profile?.profileCreationScreen === 4
                    ? 4
                    : data?.profile?.profileCreationScreen === 5
                    ? 4
                    : null
                  : count.indexOf(data?.profile?.profileCreationScreen) + 2
              }
            >
              <Form2 />
              <Form3 />
              <Form4 />
              <Form5 />
            </StepWizard>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileCreation;

export const getServerSideProps = ({ query }) => {
  console.log(query);
  return {
    props: {
      query: query,
    },
  };
};
