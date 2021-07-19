import { useContext, useEffect, useState } from "react";
import Form2 from "@/components/Profile-creation/Form2/Form2";
import Form3 from "@/components/Profile-creation/Form3/Form3";
import Form4 from "@/components/Profile-creation/Form4/Form4";
import Form5 from "@/components/Profile-creation/Form5/Form5";
import StepWizard from "react-step-wizard";
import { NEXT_URL, API_URL } from "@/config/index";
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

const ProfileCreation = ({ query: { token } }) => {
  const [userToken, setUserToken] = useState(token);
  const count = [1, 2];
  const router = useRouter();
  const { serverLoading } = useContext(AuthContext);
  const [uid, setUid] = useState("");

  const getProfileCreationScreen = useQuery(GET_PROFILE_CREATION_SCREEN, {
    variables: {
      id: parseJwt(userToken),
    },
  });

  useEffect(async () => {
    if (!userToken) {
      const res = await fetch(`${NEXT_URL}/api/user`, {
        method: "GET",
      });
      const resData = await res.json();
      // console.log(resData);
      if (!resData.token) {
        router.back();
        return;
      }
      setUserToken(resData.token);
    }
    getProfileCreationScreen.data && console.log(getProfileCreationScreen.data);

    setUid(parseJwt(userToken));
  }, [userToken]);

  // useEffect(() => {
  //   window.onlostpointercapture = (event) => {
  //     router.replace(
  //       `/profile-creation/?token=${userToken}`,
  //       `/profile-creation`,
  //       { shallow: true }
  //     );
  //   };
  // });

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

          {getProfileCreationScreen.loading ? (
            <div className="container d-flex">
              <h5 className="m-auto h-100 text-secondary">Loading...</h5>
            </div>
          ) : (
            <StepWizard
              initialStep={
                // count.indexOf(
                //   getProfileCreationScreen.data?.profile?.profileCreationScreen
                // ) < 0
                //   ? getProfileCreationScreen.data?.profile
                //       ?.profileCreationScreen === 4
                //     ? 4
                //     : getProfileCreationScreen.data?.profile
                //         ?.profileCreationScreen === 5
                //     ? 4
                //     : null
                //   : count.indexOf(
                //       getProfileCreationScreen.data?.profile
                //         ?.profileCreationScreen
                //     ) + 2
                3
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
