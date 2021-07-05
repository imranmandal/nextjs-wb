import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import AppOverview from "components/AppOverview";
import AuthContext from "context/AuthContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

export default function Home() {
  // const { uuId, createUuid } = useContext(AuthContext);
  const router = useRouter();

  // console.log(router);
  const [queryData, setQueryData] = useState("");

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

  useEffect(() => {
    if (router.query) {
      setQueryData(router.query.phone);
    }
  });

  // useEffect(() => {
  //   // console.log(uuidv4());
  //   createUuid();
  // }, []);

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
    <Layout queryData={queryData}>
      <div className={styles.container}>
        <AppOverview />
      </div>
    </Layout>
  );
}
