import styles from "@/styles/DownloadApp.module.css";
import { reportPlayStoreClick } from "GTM";

const DownloadApp = () => {
  return (
    <>
      <div className={styles.download_app_section}>
        <div className="container-fluid px-5 py-5 px-md-0 text-center d-flex">
          <div className="container py-5 my-auto">
            <div>
              <h1>Trusted by 1000+ and growing everyday...</h1>
              <p>
                Not sure yet? Give us a try to experience why we've become the
                fastest growing matrimony service in India...
              </p>
            </div>
            <div>
              <a
                onClick={reportPlayStoreClick}
                href="https://play.google.com/store/apps/details?id=apptivism.would_bee.app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
              >
                <img
                  alt="Get it on Google Play"
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadApp;
