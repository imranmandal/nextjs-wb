import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import AppOverview from "components/AppOverview";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [values, setValues] = useState({
    imgValues: {
      showImage: true,
      imgPath: "/Images/bg-landscape-desktop.jpg",
    },
    vdoValues: {
      showVideo: false,
      vdoPath: "/Images/wouldbee.mp4",
    },
  });

  // if (router.query.q === "ALeKk00ErtDO57453vZu3qIWxu7Ss5OY6w") {
  //   return setValues((prevVal) => ({
  //     imgValues: { ...prevVal.imgValues, showImage: false },
  //     vdoValues: { ...prevVal.vdoValues, showVideo: true },
  //   }));
  // } else if (router.query.q === "ALeKk01_r8NWKTyvkD0mTQaub5h5JjeiZg") {
  //   return setValues((prevVal) => ({
  //     imgValues: { ...prevVal.imgValues, showImage: true },
  //     vdoValues: { ...prevVal.vdoValues, showVideo: false },
  //   }));
  // }

  return (
    // <Layout
    //   showImage={values.imgValues.showImage}
    //   imgPath={values.imgValues.imgPath}
    //   showVideo={values.vdoValues.showVideo}
    //   vdoPath={values.vdoValues.vdoPath}
    // >

    // </Layout>
    <Layout>
      <div className={styles.container}>
        <AppOverview />
      </div>
    </Layout>
  );
}
