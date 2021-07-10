import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import AppOverview from "components/AppOverview";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home({ wideImg, portraitImg }) {
  const router = useRouter();

  const [queryData, setQueryData] = useState("");

  const [values, setValues] = useState({
    imgValues: {
      showImage: true,
      wideImg: wideImg || "/Images/bg-landscape-desktop.jpg",
      portraitImg: portraitImg || "/Images/bg-phone-portrait.jpg",
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
    >
      <div className={styles.container}>
        <AppOverview />
      </div>
    </Layout>
  );
}
