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
      setTimeout(() => {
        const url = buildUrl(imgName, {
          cloud: {
            cloudName: "ddcqufse9",
          },
        });
        setImgUrl(url);
      }, 2000);

      const urlBlurred = buildUrl(imgName, {
        cloud: {
          cloudName: "ddcqufse9",
        },
        transformations: {
          effect: "blur:1000",
          quality: 1,
        },
      });

      setBlurredImgUrl(urlBlurred);
    }
    return clearTimeout();
  }, [imgName]);

  return (
    <section className={styles.welcome}>
      <div className={styles.container}>
        {showImage && (
          <div
            className={styles.bgWrap}
            style={{
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url(${blurredImgUrl})`,
            }}
          >
            {imgUrl && (
              <Image
                src={imgUrl || "/Images/landing-page-landscape.png"}
                layout="fill"
                objectFit="cover"
                quality={75}
                unoptimized={true}
              />
              // <div></div>
            )}
          </div>
        )}

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
              <source src={vdoName} type="video/mp4" />
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
  imgName: "/Images/landing-page-landscape.png",
};

export default Welcome;
