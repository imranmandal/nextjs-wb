import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import AppOverview from "components/AppOverview";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home({ communityName, wideImg, portraitImg }) {
  const router = useRouter();

  const [queryData, setQueryData] = useState("");

  const [values, setValues] = useState({
    imgValues: {
      showImage: true,
      wideImg: wideImg || "/Images/landing-page-landscape.png",
      portraitImg: portraitImg || "/Images/landing-page-phone-portrait.png",
    },
    vdoValues: {
      showVideo: false,
      vdoPath: "/Images/wouldbee.mp4",
    },
  });

  useEffect(() => {
    if (router.query) {
      setQueryData(router.query.phone);
    }
  });

  return (
    <Layout
      img={values.imgValues}
      video={values.vdoValues}
      queryData={queryData}
      communityName={communityName}
    >
      <div className={styles.container}>
        <AppOverview />
      </div>
    </Layout>
  );
}
