import React, { useEffect, useState } from "react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import Image from "next/image";
import styles from "@/styles/Welcome.module.css";

function Welcome({
  showVideo,
  showImage,
  vdoPath,
  wideImgPath,
  portraitImgPath,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={styles.welcome}>
      <div className={styles.container}>
        {showImage && (
          <div className={styles.bgWrap}>
            <Image
              src={wideImgPath || "/Images/bg-landscape-desktop.jpg"}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
        )}

        {showVideo && (
          <div className="fullscreen-video-wrap">
            <video id="video" className="bg" autoPlay playsinline muted loop>
              <source src={vdoPath} type="video/mp4" />
            </video>
          </div>
        )}

        <div className={styles.bgText}>
          <div className="header-content text-capitalize">
            <div>
              <h1> Would Bee Matrimony</h1>
              <h4>Truly free, Fanatically safe!</h4>
              <p>Join our rapidly growing community Today...</p>

              <div className={styles.downloadBtn}>
                <a
                  className="download"
                  href="https://play.google.com/store/apps/details?id=apptivism.would_bee.app"
                  onClick="return gtag_report_conversion('https://wouldbee.com')"
                >
                  download app
                  <IoLogoGooglePlaystore className="mx-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Welcome.defaultProps = {
  showImage: true,
  imgPath: "/Images/bg-landscape-desktop.jpg",
};

export default Welcome;
