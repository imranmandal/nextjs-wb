import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import { useRouter } from "next/router";
import styles from "@/styles/Layout.module.css";
import Welcome from "./Welcome";
import DownloadApp from "./DownloadAppSection";

const Layout = ({
  title,
  keywords,
  description,
  children,
  // showImage,
  // showVideo,
  // imgPath,
  // vdoPath,
}) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      {router.pathname === "/" && (
        <Welcome
        // showImage={showImage}
        // showVideo={showVideo}
        // imgPath={imgPath}
        // vdoPath={vdoPath}
        />
      )}

      <div id="body" className={styles.container}>
        {children}
      </div>

      {router.pathname === "/" && <DownloadApp />}
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title:
    "Would Bee - Free Matrimony & Match Making, Jeevansathi Search for Shaadi in Bharat",
  description: "Truly Free, Fanatically Safe!",
  keywords: "matrimony, jeevansathi, wouldbee",
  // showImage: true,
  // imgPath: "/Images/bg-landscape-desktop.jpg",
};

export default Layout;
