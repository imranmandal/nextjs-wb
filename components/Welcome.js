import React, { useEffect, useState } from "react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import Image from "next/image";
import styles from "@/styles/Welcome.module.css";
import { buildUrl } from "cloudinary-build-url";
import { NEXT_URL } from "@/config/index";

function Welcome({ showVideo, showImage, vdoPath, imgName, communityName }) {
  // console.log(imgName);
  const [imgUrl, setImgUrl] = useState();
  const [blurredImgUrl, setBlurredImgUrl] = useState();

  useEffect(() => {
    if (imgName) {
      // const url = buildUrl(`${imgName}.jpg`, {
      //   cloud: {
      //     cloudName: "ddcqufse9",
      //   },
      // });

      // const urlBlurred = buildUrl(`${imgName}.jpg`, {
      //   cloud: {
      //     cloudName: "ddcqufse9",
      //   },
      //   transformations: {
      //     effect: "blur:1000",
      //     quality: 1,
      //   },
      // });

      setImgUrl(`${NEXT_URL}/Images/${imgName}.png`);
      setBlurredImgUrl(`${NEXT_URL}/ImagePlaceholders/${imgName}.webp`);
      // setImgUrl(url);
      // setBlurredImgUrl(urlBlurred);
    }
  }, [imgName]);

  return (
    <section className={styles.welcome}>
      <div className={styles.container}>
        <div
          className={styles.bgWrap}
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${blurredImgUrl})`,
          }}
        >
          {/* {imgUrl && ( */}
          <Image
            src={imgUrl || "/Images/landing-page-landscape.png"}
            layout="fill"
            objectFit="cover"
            unoptimized={true}
          />
          {/* )} */}
        </div>

        {showVideo && (
          <div className={styles.bgWrap}>
            <video
              id="video"
              className="bg"
              style={{ objectFit: "cover" }}
              autoPlay
              muted
              loop
            >
              <source src={vdoPath} type="video/mp4" />
            </video>
          </div>
        )}
        <div className={styles.bgText}>
          <div className="header-content text-capitalize">
            <div>
              <h1> Would Bee Matrimony</h1>
              <h4>Truly free, Fanatically safe!</h4>
              <p>
                Join our rapidly growing{" "}
                {communityName ? communityName + " " : ""}community Today...
              </p>

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
  imgName: "landing-page-landscape",
};

export default Welcome;
