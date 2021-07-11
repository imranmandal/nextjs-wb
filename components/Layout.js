import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import { useRouter } from "next/router";
import styles from "@/styles/Layout.module.css";
import Welcome from "./Welcome";
import DownloadApp from "./DownloadAppSection";
import { NEXT_URL } from "@/config/index";
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
    console.log(NEXT_URL + img.wideImg);
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

        <meta property="og:title" content={title} />
        <meta property="og:url" content={NEXT_URL + router.pathname} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:image"
          itemProp="image"
          content={NEXT_URL + img.wideImg}
        />
        <meta
          property="og:image"
          itemProp="image"
          content={NEXT_URL + img.wideImg}
        />
        <meta property="og:image:secure_url" content={NEXT_URL + img.wideImg} />
        <meta property="og:image:secure_url" content={NEXT_URL + img.wideImg} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />
        <meta property="og:image:alt" content="Would Bee" />
        <meta property="og:site_name" content="Wouldbee.com" />
        <meta property="fb:app_id" content="3074679522638036" />
        <link rel="image_src" href={NEXT_URL + img.wideImg} />
        <link
          rel="apple-touch-icon"
          sizes="32x32"
          href={NEXT_URL + "/favicon-06.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href={NEXT_URL + "/favicon-09.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="72x72"
          href={NEXT_URL + "/favicon-10.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href={NEXT_URL + "/favicon-11.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={NEXT_URL + "/favicon-13.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={NEXT_URL + "/favicon-14.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="144x144"
          href={NEXT_URL + "/favicon-15.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="196x196"
          href={NEXT_URL + "/favicon-16.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="72x72"
          href={NEXT_URL + "/favicon-17.png"}
        />
        {/* <link rel="apple-touch-icon" href={NEXT_URL + "/favicon-17.png"} /> */}
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
