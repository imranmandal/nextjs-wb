import Image from "next/image";
import styles from "@/styles/AppOverview.module.css";

const leftCornerFiller = "/Images/leftCornerFiller.png";
const rightCornerFiller = "/Images/rightCornerFiller.png";
const phone1 = "/Images/phone1.png";
const phone2 = "/Images/phone2.png";
const phone3 = "/Images/phone3.png";
const phone4 = "/Images/phone4.png";
const filler1 = "/Images/filler1.png";
const filler2 = "/Images/filler2.png";
const filler3 = "/Images/filler3.png";
const filler4 = "/Images/filler4.png";
const filler5 = "/Images/filler5.png";
const filler6 = "/Images/filler6.png";

const AppOverview = () => {
  return (
    <>
      <section className={styles.detail}>
        <div className={styles.leftCornerFiller}>
          <Image
            src={leftCornerFiller}
            alt="leftCornerFiller"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={styles.rightCornerFiller}>
          <Image
            src={rightCornerFiller}
            alt="rightCornerFiller"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={styles.filler5}>
          <Image
            src={filler5}
            alt="filler5"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={styles.filler6}>
          <Image
            src={filler6}
            alt="filler6"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className={styles.para1}>
          <div className={styles.content}>
            <h3 className="text-capitalize">
              truly free matrimony app - Zero payments
            </h3>
            <p>
              Every matrimony app offers free registration but asks for money to
              connect you to potential matches. Not us!
            </p>
          </div>

          <div className={styles.phone}>
            <Image
              src="/Images/phone1.png"
              alt="phone"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className={styles.filler1}>
            <Image
              src={filler1}
              alt="filler1"
              layout="fill"
              objectFit="contain"
            />
          </div>
          {/* <img src="/Images/phone1.png" alt="phoneScreen" /> */}
          {/* <img src={filler1} alt="branches" /> */}
        </div>

        <div className={styles.para2}>
          <div className={styles.content}>
            <h3 className="text-capitalize">free yet SAFE</h3>
            <p>
              We are fanatic about our users' safety. We take all possible
              measures to keep Fraudsters and Scammers away.
            </p>
          </div>

          <div className={styles.phone}>
            <Image
              src="/Images/phone2.png"
              alt="phone"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className={styles.filler2}>
            <Image
              src={filler2}
              alt="branches"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className={styles.para3}>
          <div className={styles.content}>
            <h3 className="text-capitalize">smart compatibility </h3>
            <p>
              Check your compatibility score based on our proprietary
              compatibility calculator.
            </p>
          </div>

          <div className={styles.phone}>
            <Image
              src="/Images/phone3.png"
              alt="phone"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className={styles.filler3}>
            <Image
              src={filler3}
              alt="filler3"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className={styles.para4}>
          <div className={styles.content}>
            <h3 className="text-capitalize">Take control of your privacy</h3>
            <p>
              You are in full control of your privacy. You decide who can see
              your information and how much information to reveal.
            </p>
          </div>

          <div className={styles.phone}>
            <Image
              src="/Images/phone4.png"
              alt="phone"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className={styles.filler4}>
            <Image
              src={filler4}
              alt="filler4"
              layout="fill"
              objectFit="contain"
            />
            {/* <img src={filler4} alt="branches" /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default AppOverview;
