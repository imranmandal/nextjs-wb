import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import { useRouter } from "next/router";
import styles from "@/styles/Layout.module.css";
import Welcome from "./Welcome";
import DownloadApp from "./DownloadAppSection";
import { useEffect, useState } from "react";

const Layout = ({
  title,
  keywords,
  description,
  children,

  queryData,
  img,
  video,
}) => {
  const router = useRouter();
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    window.innerWidth < 768
      ? setImgUrl(img.portraitImg)
      : setImgUrl(img.wideImg);
  });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header queryData={queryData} />

      {router.pathname === "/" || router.pathname.includes("/wb/") ? (
        <Welcome imgPath={imgUrl} />
      ) : null}

      <div id="body" className={styles.container}>
        {children}
      </div>

      {router.pathname === "/" || router.pathname.includes("/wb/") ? (
        <DownloadApp />
      ) : null}
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title:
    "Would Bee - Free Matrimony & Match Making, Jeevansathi Search for Shaadi in Bharat",
  description: "Truly Free, Fanatically Safe!",
  keywords: "matrimony, jeevansathi, wouldbee",
  img: {
    wideImg: "/Images/bg-landscape-desktop.jpg",
    portraitImg: "/Images/bg-phone-portrait-small.jpg",
  },
};

export default Layout;
