import Image from "next/image";
import styles from "@/styles/Signup.module.css";
import { reportPlayStoreClick } from "GTM";

function Form1Content(props) {
  const { form1ContentStyle, form1ContentH1Style } = props;
  return (
    <div
      style={form1ContentStyle}
      className="d-flex justify-content-around p-4"
    >
      <div>
        <div className={styles.phoneImg}>
          <Image
            src="/Images/phone1.png"
            alt="phoneScreen"
            layout="intrinsic"
            height="350"
            width="180"
          />
        </div>
        <div className={styles.leftCornerFiller}>
          <Image
            src="/Images/leftCornerFiller.png"
            alt="filler"
            layout="intrinsic"
            height="350"
            width="300"
          />
        </div>
        <div className={styles.filler3}>
          <Image src="/Images/filler5.png" alt="filler" layout="fill" />
        </div>
      </div>
      <div>
        <h2 style={form1ContentH1Style} className="text-left p-3">
          Truly Free Matrimony App
        </h2>
        <a
          className="p-2"
          onClick={reportPlayStoreClick}
          href="https://play.google.com/store/apps/details?id=apptivism.would_bee.app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
        >
          <img
            style={{ width: "150px" }}
            alt="Get it on Google Play"
            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
          />
        </a>
      </div>
    </div>
  );
}

export default Form1Content;
