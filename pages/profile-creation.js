import { useContext, useEffect, useState } from "react";
import Form2 from "@/components/Profile-creation/Form2/Form2";
import Form3 from "@/components/Profile-creation/Form3/Form3";
import Form4 from "@/components/Profile-creation/Form4/Form4";
import Form5 from "@/components/Profile-creation/Form5/Form5";
import StepWizard from "react-step-wizard";
import { NEXT_URL } from "@/config/index";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Signup.module.css";
import modalStyle from "@/styles/Modal.module.css";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import { GET_PROFILE_CREATION_SCREEN } from "@/components/Graphql/query/query";
import { parseJwt } from "@/components/Profile-creation/ParseJwt";
import { useRouter } from "next/router";

const ProfileCreation = ({ query: { token } }) => {
  const [userToken, setUserToken] = useState(token);
  const count = [0, 1, 2];
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [activePage, setActivePage] = useState(null);

  const { data, error, loading } = useQuery(GET_PROFILE_CREATION_SCREEN, {
    variables: {
      id: parseJwt(userToken),
    },
  });

  useEffect(() => {
    if (data?.profile?.profileCreationScreen) {
      setActivePage(
        data?.profile?.profileCreationScreen
          ? count.indexOf(data?.profile?.profileCreationScreen) < 0
            ? data?.profile?.profileCreationScreen === 4
              ? 5
              : data?.profile?.profileCreationScreen === 5
              ? 5
              : 1
            : count.indexOf(data?.profile?.profileCreationScreen) + 2
          : 2
      );
      return;
    }
  }, [data]);

  useEffect(async () => {
    if (!userToken) {
      const res = await fetch(`${NEXT_URL}/api/user`, {
        method: "GET",
      });
      const resData = await res.json();
      if (!resData.token) {
        router.back();
        return;
      }

      setUserToken(resData.token);
    }
  }, [userToken]);

  useEffect(() => {
    if (!loading) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [loading]);

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

          {!activePage && (
            <div className={modalStyle.loading_container_no_overlay}>
              <div
                className="spinner-border text-pink m-auto"
                role="status"
              ></div>
            </div>
          )}
          {showForm && !loading && (
            <StepWizard initialStep={activePage}>
              <div></div>
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
  return {
    props: {
      query: query,
    },
  };
};
