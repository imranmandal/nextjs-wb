import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import AppOverview from "components/AppOverview";
import { useState } from "react";

export default function Home({
  communityName,
  wideImg,
  portraitImg,
  showVideo,
}) {
  const [values, setValues] = useState({
    imgValues: {
      showImage: true,
      wideImg: wideImg || "landing-page-landscape",
      portraitImg: portraitImg || "landing-page-phone-portrait",
    },
    vdoValues: {
      showVideo: false,
      vdoPath: "/Images/wouldbee.mp4",
    },
  });

  return (
    <Layout
      img={values.imgValues}
      video={values.vdoValues}
      showImage={!showVideo}
      communityName={communityName}
      showVideo={showVideo}
    >
      <div className={styles.container}>
        <AppOverview />
      </div>
    </Layout>
  );
}
